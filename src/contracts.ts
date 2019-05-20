/*
* @poppinss/manager
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

declare module '@poppinss/manager/contracts' {
  export interface ManagerContract<DriverContract extends any, DriversList extends string = any> {
    driver (name?: DriversList): DriverContract,
    extend (name: string, callback: (container: any) => DriverContract): void,
  }
}
