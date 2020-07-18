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
export type ExtendCallback<
	Manager extends ManagerContract<any, any>,
	Driver extends any,
	Name extends any
> = (manager: Manager, mappingName: Name, config: any) => Driver

/**
 * Manager class shape
 */
export interface ManagerContract<
	Container extends any,
	DriverContract extends any,
	MappingValue extends any = DriverContract,
	MappingsList extends { [key: string]: MappingValue } = any
> {
	container: Container

	/**
	 * Returns concrete type when binding name is from the mappings list
	 */
	use<K extends keyof MappingsList>(name: K): MappingsList[K]

	/**
	 * Return a overload of mapping when no key is defined
	 */
	use(): { [K in keyof MappingsList]: MappingsList[K] }[keyof MappingsList]

	/**
	 * Extend by adding a new custom driver
	 */
	extend(name: string, callback: ExtendCallback<this, DriverContract, keyof MappingsList>): void

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
