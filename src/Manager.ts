/*
 * @poppinss/manager
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { ManagerContract, ExtendCallback } from './Contracts'

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
	Container extends any,
	DriverContract extends any,
	MappingValue extends any = DriverContract,
	MappingsList extends { [key: string]: MappingValue } = any
> implements ManagerContract<Container, DriverContract, MappingValue, MappingsList> {
	/**
	 * Mappings cache (if caching is enabled)
	 */
	private mappingsCache: Map<string, MappingValue> = new Map()

	/**
	 * List of drivers added at runtime
	 */
	private extendedDrivers: {
		[key: string]: ExtendCallback<ManagerContract<any, any>, DriverContract>
	} = {}

	/**
	 * Whether or not to cache mappings
	 */
	protected abstract singleton: boolean

	/**
	 * Getting the default mapping name, incase a mapping
	 * is not defined
	 */
	protected abstract getDefaultMappingName(): string

	/**
	 * Getting config for the mapping. It is required for making
	 * extended drivers
	 */
	protected abstract getMappingConfig(mappingName: string): any | undefined

	/**
	 * Getting the driver name for the mapping
	 */
	protected abstract getMappingDriver(mappingName: string): string | undefined

	constructor(public container: Container) {}

	/**
	 * Returns the value saved inside cache, this method will check for
	 * `cacheDrivers` attribute before entertaining the cache
	 */
	private getFromCache(name: string): MappingValue | null {
		return this.mappingsCache.get(name) || null
	}

	/**
	 * Saves value to the cache with the driver name. This method will check for
	 * `cacheDrivers` attribute before entertaining the cache.
	 */
	private saveToCache(name: string, value: MappingValue): void {
		if (this.singleton) {
			this.mappingsCache.set(name, value)
		}
	}

	/**
	 * Make the extended driver instance and save it to cache (if enabled)
	 */
	private makeExtendedDriver(mappingName: string, driver: string, config: any): MappingValue {
		const value = this.wrapDriverResponse(mappingName, this.extendedDrivers[driver](this, mappingName, config))
		this.saveToCache(mappingName, value)
		return value
	}

	/**
	 * Make the custom driver instance by checking for function on the
	 * parent class.
	 *
	 * For example: `stmp` as the driver name will look for `createSmtp`
	 * method on the parent class.
	 */
	private makeDriver(mappingName: string, driver: string, config: any): MappingValue {
		const driverCreatorName = `create${capitalize(
			driver.replace(/-\w|_\w/g, (g) => {
				return g.substr(1).toUpperCase()
			})
		)}`

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
	protected wrapDriverResponse(_: string, value: DriverContract): MappingValue {
		return (value as unknown) as MappingValue
	}

	/**
	 * Returns the instance of a given driver. If `name` is not defined
	 * the default driver will be resolved.
	 */
	public use<K extends keyof MappingsList & string>(name: K): MappingsList[K]
	public use(name: string): MappingValue
	public use(): { [K in keyof MappingsList]: MappingsList[K] }[keyof MappingsList]
	public use<K extends keyof MappingsList & string>(
		name?: K | string
	): MappingsList[K] | MappingValue | { [K in keyof MappingsList]: MappingsList[K] }[keyof MappingsList] {
		name = name || this.getDefaultMappingName()

		const cached = this.getFromCache(name)
		if (cached) {
			return cached
		}

		/**
		 * Ensure that driver exists for a given mapping
		 */
		const driver = this.getMappingDriver(name)
		if (!driver) {
			throw new Error(`Make sure to define driver for "${name}" mapping`)
		}

		/**
		 * Making the extended driver
		 */
		if (this.extendedDrivers[driver]) {
			return this.makeExtendedDriver(name, driver, this.getMappingConfig(name))
		}

		/**
		 * Making the predefined driver
		 */
		return this.makeDriver(name, driver, this.getMappingConfig(name))
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
	public extend(name: string, callback: ExtendCallback<this, DriverContract>) {
		this.extendedDrivers[name] = callback
	}
}
