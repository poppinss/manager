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

export interface ManagerContract<
  DriverContract extends any,
  DriversList extends { [key: string]: DriverContract } = { [key: string]: DriverContract },
  DefaultDriver extends DriverContract = DriverContract,
> {
  driver<K extends keyof DriversList> (name: K): DriversList[K],
  driver (name: string): DriverContract,
  driver (): DefaultDriver,
  extend (name: string, callback: (container: any) => DriverContract): void,
}

/**
 * Shape in which a driver must be defined.
 */
export type DriverNode<Implementation, Config> = {
  config: Config,
  implementation: Implementation,
}

/**
 * A list of drivers
 */
export type DriverNodesList<Implementation, Config> = {
  [key: string]: DriverNode<Implementation, Config>,
}

/**
 * Extracts the list of implementations of DriverNodesList
 */
export type ExtractDriversImpl<List extends DriverNodesList<any, any>> = {
  [P in keyof List]: List[P]['implementation']
}

/**
 * Extracts the default driver implementation. For this type to work,
 * the config must have a `driver` property and each config node
 * key must be same as the driver name.
 */
export type ExtractDefaultDriverImpl<
  List extends DriverNodesList<any, any>,
  Config extends { driver: keyof List },
> = List[Config['driver']]['implementation']

/**
 * Extracts the list of config of DriverNodesList
 */
export type ExtractDriversConfig<List extends DriverNodesList<any, any>> = {
  [P in keyof List]?: List[P]['config']
}

/**
 * Extracts the default driver config. For this type to work,
 * the config must have a `driver` property and each config
 * node key must be same as the driver name.
 */
export type ExtractDefaultDriverConfig<
  List extends DriverNodesList<any, any>,
  Config extends { driver: keyof List },
> = List[Config['driver']]['config']
