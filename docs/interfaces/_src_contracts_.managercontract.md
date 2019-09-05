**[@poppinss/manager](../README.md)**

[Globals](../README.md) › ["src/contracts"](../modules/_src_contracts_.md) › [ManagerContract](_src_contracts_.managercontract.md)

# Interface: ManagerContract <**DriverContract, MappingsList, DefaultItem**>

## Type parameters

▪ **DriverContract**: *any*

▪ **MappingsList**: *object*

▪ **DefaultItem**: *DriverContract*

## Hierarchy

* **ManagerContract**

## Implemented by

* [Manager](../classes/_src_manager_.manager.md)

## Index

### Methods

* [extend](_src_contracts_.managercontract.md#extend)
* [use](_src_contracts_.managercontract.md#use)

## Methods

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

___

###  use

▸ **use**<**K**>(`name`: K): *MappingsList[K]*

**Type parameters:**

▪ **K**: *keyof MappingsList*

**Parameters:**

Name | Type |
------ | ------ |
`name` | K |

**Returns:** *MappingsList[K]*

▸ **use**(`name`: string): *DefaultItem*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *DefaultItem*

▸ **use**(): *DefaultItem*

**Returns:** *DefaultItem*