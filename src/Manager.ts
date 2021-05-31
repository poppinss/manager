/*
 * @poppinss/manager
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { ManagerContract, ExtendCallback } from './Contracts'

/**
 * The simplest implementation of capitalizing a string
 */
const capitalize = (value: string) => {
  if (!value) {
    return value
  }
  return value.charAt(0).toUpperCase() + value.slice(1)
}

/**
 * Manager class implements the Builder pattern to make instance of similar
 * implementations using a fluent API vs importing each class by hand.
 *
 * This module is used extensively in AdonisJs. For example: `Mail`, `Sessions`,
 * `Auth` and so on.
 */
export abstract class Manager<
  Application extends any,
  DriverContract extends any,
  MappingValue extends any = DriverContract,
  MappingsList extends { [key: string]: MappingValue } = any
> implements ManagerContract<Application, DriverContract, MappingValue, MappingsList>
{
  /**
   * Mappings cache (if caching is enabled)
   */
  private mappingsCache: Map<keyof MappingsList, MappingValue> = new Map()

  /**
   * A cache to store the function names for initiating driver instances.
   */
  private driverCreatorNames: Map<string, string> = new Map()

  /**
   * List of drivers added at runtime
   */
  private extendedDrivers: {
    [key: string]: ExtendCallback<ManagerContract<any, any>, DriverContract, keyof MappingsList>
  } = {}

  /**
   * Whether or not to cache mappings
   */
  protected abstract singleton: boolean

  /**
   * Getting the default mapping name, incase a mapping
   * is not defined
   */
  protected abstract getDefaultMappingName(): keyof MappingsList

  /**
   * Getting config for the mapping. It is required for making
   * extended drivers
   */
  protected abstract getMappingConfig(mappingName: keyof MappingsList): any | undefined

  /**
   * Getting the driver name for the mapping
   */
  protected abstract getMappingDriver(mappingName: keyof MappingsList): string | undefined

  constructor(public application: Application) {}

  /**
   * Returns the value saved inside cache, this method will check for
   * `cacheDrivers` attribute before entertaining the cache
   */
  private getFromCache(name: keyof MappingsList): MappingValue | null {
    return this.mappingsCache.get(name) || null
  }

  /**
   * Saves value to the cache with the driver name. This method will check for
   * `cacheDrivers` attribute before entertaining the cache.
   */
  private saveToCache(name: keyof MappingsList, value: MappingValue): void {
    if (this.singleton) {
      this.mappingsCache.set(name, value)
    }
  }

  /**
   * Make the extended driver instance and save it to cache (if enabled)
   */
  private makeExtendedDriver(
    mappingName: keyof MappingsList,
    driver: string,
    config: any
  ): MappingValue {
    const value = this.wrapDriverResponse(
      mappingName,
      this.extendedDrivers[driver](this, mappingName, config)
    )
    this.saveToCache(mappingName, value)
    return value
  }

  /**
   * Returns the creator function name for a given driver.
   */
  private getDriverCreatorName(driver: string): string {
    if (!this.driverCreatorNames.has(driver)) {
      this.driverCreatorNames.set(
        driver,
        `create${capitalize(driver.replace(/-\w|_\w/g, (g) => g.substr(1).toUpperCase()))}`
      )
    }

    return this.driverCreatorNames.get(driver)!
  }

  /**
   * Make the custom driver instance by checking for function on the
   * parent class.
   *
   * For example: `stmp` as the driver name will look for `createSmtp`
   * method on the parent class.
   */
  private makeDriver(mappingName: keyof MappingsList, driver: string, config: any): MappingValue {
    const driverCreatorName = this.getDriverCreatorName(driver)

    /**
     * Raise error when the parent class doesn't implement the function
     */
    if (typeof this[driverCreatorName] !== 'function') {
      throw new Error(`"${driver}" driver is not supported by "${this.constructor.name}"`)
    }

    const value = this.wrapDriverResponse(mappingName, this[driverCreatorName](mappingName, config))
    this.saveToCache(mappingName, value)
    return value
  }

  /**
   * Optional method to wrap the driver response
   */
  protected wrapDriverResponse(_: keyof MappingsList, value: DriverContract): MappingValue {
    return value as unknown as MappingValue
  }

  /**
   * Returns the instance of a given driver. If `name` is not defined
   * the default driver will be resolved.
   */
  public use<K extends keyof MappingsList & string>(name: K): MappingsList[K]
  public use(): { [K in keyof MappingsList]: MappingsList[K] }[keyof MappingsList]
  public use<K extends keyof MappingsList & string>(
    name?: K
  ):
    | MappingsList[K]
    | MappingValue
    | { [Mapping in keyof MappingsList]: MappingsList[Mapping] }[keyof MappingsList] {
    const mappingName = name || this.getDefaultMappingName()

    const cached = this.getFromCache(mappingName)
    if (cached) {
      return cached
    }

    /**
     * Ensure that driver exists for a given mapping
     */
    const driver = this.getMappingDriver(mappingName)
    if (!driver) {
      throw new Error(`Make sure to define driver for "${mappingName}" mapping`)
    }

    /**
     * Making the extended driver
     */
    if (this.extendedDrivers[driver]) {
      return this.makeExtendedDriver(mappingName, driver, this.getMappingConfig(mappingName))
    }

    /**
     * Making the predefined driver
     */
    return this.makeDriver(mappingName, driver, this.getMappingConfig(mappingName))
  }

  /**
   * Removes the mapping from internal cache.
   */
  public release<K extends keyof MappingsList & string>(name: K): void
  public release(name: string): void
  public release<K extends keyof MappingsList & string>(name: string | K): void {
    this.mappingsCache.delete(name)
  }

  /**
   * Extend by adding new driver. The compositon of driver
   * is the responsibility of the callback function
   */
  public extend(name: string, callback: ExtendCallback<this, DriverContract, keyof MappingsList>) {
    this.extendedDrivers[name] = callback
  }
}
