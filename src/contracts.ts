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
