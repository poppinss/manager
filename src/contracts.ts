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
  MappingsList extends { [key: string]: DriverContract } = { [key: string]: DriverContract },
  DefaultItem extends DriverContract = DriverContract,
> {
  use<K extends keyof MappingsList> (name: K): MappingsList[K],
  use (name: string): DefaultItem,
  use (): DefaultItem,
  extend (name: string, callback: (container: any) => DriverContract): void,
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
