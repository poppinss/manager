**[@poppinss/manager](../README.md)**

[Globals](../README.md) › ["src/contracts"](../modules/_src_contracts_.md) › [ManagerContract](_src_contracts_.managercontract.md)

# Interface: ManagerContract <**DriverContract, DriversList, DefaultDriver**>

## Type parameters

▪ **DriverContract**: *any*

▪ **DriversList**: *object*

▪ **DefaultDriver**: *DriverContract*

## Hierarchy

* **ManagerContract**

## Implemented by

* [Manager](../classes/_src_manager_.manager.md)

## Index

### Methods

* [driver](_src_contracts_.managercontract.md#driver)
* [extend](_src_contracts_.managercontract.md#extend)

## Methods

###  driver

▸ **driver**<**K**>(`name`: K): *DriversList[K]*

**Type parameters:**

▪ **K**: *keyof DriversList*

**Parameters:**

Name | Type |
------ | ------ |
`name` | K |

**Returns:** *DriversList[K]*

▸ **driver**(`name`: string): *DriverContract*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *DriverContract*

▸ **driver**(): *DefaultDriver*

**Returns:** *DefaultDriver*

___

###  extend

▸ **extend**(`name`: string, `callback`: function): *void*

**Parameters:**

▪ **name**: *string*

▪ **callback**: *function*

▸ (`container`: any): *DriverContract*

**Parameters:**

Name | Type |
------ | ------ |
`container` | any |

**Returns:** *void*