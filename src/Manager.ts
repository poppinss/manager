/**
 * @module @poppinss/manager
 */

/*
* @poppinss/manager
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { ManagerContract } from './contracts'

/**
 * Manager class implements the Builder pattern to make instance of similar
 * implementations using a fluent API vs importing each class by hand.
 *
 * This module is used extensively in AdonisJs. For example: `Mail`, `Sessions`,
 * `Auth` and so on.
 */
export abstract class Manager<
  DriverContract extends any,
  MappingsList extends { [key: string]: DriverContract } = { [key: string]: DriverContract },
  DefaultItem extends DriverContract = DriverContract,
> implements ManagerContract<DriverContract, MappingsList, DefaultItem> {
  /**
   * Mappings cache (if caching is enabled)
   */
  private _mappingsCache: Map<string, DriverContract> = new Map()

  /**
   * List of drivers added at runtime
   */
  private _extendedDrivers: {
    [key: string]: (container: any, mappingName: string, config: any) => DriverContract,
  } = {}

  /**
   * Whether or not to cache mappings
   */
  protected abstract $cacheMappings: boolean

  /**
   * Getting the default mapping name, incase a mapping
   * is not defined
   */
  protected abstract getDefaultMappingName (): string

  /**
   * Getting config for the mapping. It is required for making
   * extended drivers
   */
  protected abstract getMappingConfig (mappingName: string): any | undefined

  /**
   * Getting the driver name for the mapping
   */
  protected abstract getMappingDriver (mappingName: string): string | undefined

  constructor (protected $container: any) {
  }

  /**
   * Returns the value saved inside cache, this method will check for
   * `cacheDrivers` attribute before entertaining the cache
   */
  private _getFromCache (name: string): DriverContract | null {
    return this._mappingsCache.get(name) || null
  }

  /**
   * Saves value to the cache with the driver name. This method will check for
   * `cacheDrivers` attribute before entertaining the cache.
   */
  private _saveToCache (name: string, value: DriverContract): void {
    if (this.$cacheMappings) {
      this._mappingsCache.set(name, value)
    }
  }

  /**
   * Make the extended driver instance and save it to cache (if enabled)
   */
  private _makeExtendedDriver (mappingName: string, driver: string, config: any): DriverContract {
    const value = this._extendedDrivers[driver](this.$container, mappingName, config)
    this._saveToCache(mappingName, value)
    return value
  }

  /**
   * Make the custom driver instance by checking for function on the
   * parent class.
   *
   * For example: `stmp` as the driver name will look for `createSmtp`
   * method on the parent class.
   */
  private _makeDriver (mappingName: string, driver: string, config: any): DriverContract {
    const driverCreatorName = `create${driver.replace(/^\w|-\w/g, (g) => g.replace(/^-/, '').toUpperCase())}`

    /**
     * Raise error when the parent class doesn't implement the function
     */
    if (typeof (this[driverCreatorName]) !== 'function') {
      throw new Error(`${mappingName} driver is not supported by ${this.constructor.name}`)
    }

    const value = this[driverCreatorName](mappingName, config)
    this._saveToCache(mappingName, value)
    return value
  }

  /**
   * Returns the instance of a given driver. If `name` is not defined
   * the default driver will be resolved.
   */
  public use<K extends keyof MappingsList> (name: K): MappingsList[K]
  public use (name: string): DriverContract
  public use (): DefaultItem
  public use<K extends keyof MappingsList> (
    name?: K | string,
  ): MappingsList[K] | DriverContract | DefaultItem {
    name = (name || this.getDefaultMappingName()) as string

    const cached = this._getFromCache(name)
    if (cached) {
      return cached
    }

    /**
     * Ensure that driver exists for a given mapping
     */
    const driver = this.getMappingDriver(name)
    if (!driver) {
      throw new Error(`Make sure to define driver for ${name} mapping`)
    }

    /**
     * Making the extended driver
     */
    if (this._extendedDrivers[driver]) {
      return this._makeExtendedDriver(name, driver, this.getMappingConfig(name))
    }

    /**
     * Making the predefined driver
     */
    return this._makeDriver(name, driver, this.getMappingConfig(name))
  }

  /**
   * Extend by adding new driver. The compositon of driver
   * is the responsibility of the callback function
   */
  public extend (
    name: string,
    callback: (container: any, mappingName: string, config: any) => DriverContract,
  ) {
    this._extendedDrivers[name] = callback
  }
}
