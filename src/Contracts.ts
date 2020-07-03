/*
 * @poppinss/manager
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Shape of the extend callback
 */
export type ExtendCallback<Manager extends ManagerContract<any>, Driver extends any> = (
	manager: Manager,
	mappingName: string,
	config: any
) => Driver

/**
 * Manager class shape
 */
export interface ManagerContract<
	DriverContract extends any,
	MappingValue extends any = DriverContract,
	MappingsList extends { [key: string]: MappingValue } = any
> {
	/**
	 * Returns concrete type when binding name is from the mappings lsit
	 */
	use<K extends keyof MappingsList>(name: K): MappingsList[K]

	/**
	 * Returns mapping value when an unknown key is defined. This will be done, when someone
	 * is trying to bypass static analysis
	 */
	use(name: string): MappingValue

	/**
	 * Return a overload of mapping when no key is defined
	 */
	use(): { [K in keyof MappingsList]: MappingsList[K] }[keyof MappingsList]

	/**
	 * Extend by adding a new custom driver
	 */
	extend(name: string, callback: ExtendCallback<this, DriverContract>): void

	/**
	 * Release bindings from cache
	 */
	release<K extends keyof MappingsList>(name: K): void
	release(name: string): void
}

/**
 * Extracts and builds a list of mappings implementation
 */
export type ExtractImplementations<List extends { [key: string]: { implementation: any } }> = {
	[P in keyof List]: List[P]['implementation']
}

/**
 * Extracts and builds a list of mappings implementation
 */
export type ExtractConfig<List extends { [key: string]: { config: any } }> = {
	[P in keyof List]: List[P]['config']
}
