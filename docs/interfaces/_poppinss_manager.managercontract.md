> ## [@poppinss/manager](../README.md)

[@poppinss/manager](../modules/_poppinss_manager.md) / [ManagerContract](_poppinss_manager.managercontract.md) /

# Interface: ManagerContract <**DriverContract, DriversList, DefaultDriver**>

## Type parameters

■` DriverContract`: *any*

■` DriversList`: *object*

■` DefaultDriver`: *`DriverContract`*

## Hierarchy

* **ManagerContract**

## Implemented by

* [Manager](../classes/_poppinss_manager.manager.md)

### Index

#### Methods

* [driver](_poppinss_manager.managercontract.md#driver)
* [extend](_poppinss_manager.managercontract.md#extend)

## Methods

###  driver

▸ **driver**<**K**>(`name`: `K`): *`DriversList[K]`*

**Type parameters:**

■` K`: *keyof DriversList*

**Parameters:**

Name | Type |
------ | ------ |
`name` | `K` |

**Returns:** *`DriversList[K]`*

▸ **driver**(`name`: string): *`DriverContract`*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *`DriverContract`*

▸ **driver**(): *`DefaultDriver`*

**Returns:** *`DefaultDriver`*

___

###  extend

▸ **extend**(`name`: string, `callback`: function): *void*

**Parameters:**

■` name`: *string*

■` callback`: *function*

▸ (`container`: any): *`DriverContract`*

**Parameters:**

Name | Type |
------ | ------ |
`container` | any |

**Returns:** *void*

___