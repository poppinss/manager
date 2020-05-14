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
export type ExtendCallback<Driver extends any> = (
  container: any,
  mappingName: string,
  config: any,
) => Driver

/**
 * Manager class shape
 */
export interface ManagerContract<
  DriverContract extends any,
  ReturnValueContract extends any = DriverContract,
  MappingsList extends { [key: string]: ReturnValueContract } = { [key: string]: ReturnValueContract },
  DefaultItem extends ReturnValueContract = ReturnValueContract,
> {
  use<K extends keyof MappingsList> (name: K): MappingsList[K],
  use (name: string): DefaultItem,
  use (): DefaultItem,
  extend (name: string, callback: ExtendCallback<DriverContract>): void,

  release<K extends keyof MappingsList> (name: K): void,
  release (name: string): void,
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
