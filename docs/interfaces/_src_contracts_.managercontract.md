[@poppinss/manager](../README.md) › ["src/Contracts"](../modules/_src_contracts_.md) › [ManagerContract](_src_contracts_.managercontract.md)

# Interface: ManagerContract <**DriverContract, ReturnValueContract, MappingsList, DefaultItem**>

## Type parameters

▪ **DriverContract**: *any*

▪ **ReturnValueContract**: *any*

▪ **MappingsList**: *object*

▪ **DefaultItem**: *ReturnValueContract*

## Hierarchy

* **ManagerContract**

## Implemented by

* [Manager](../classes/_src_manager_.manager.md)

## Index

### Methods

* [extend](_src_contracts_.managercontract.md#extend)
* [release](_src_contracts_.managercontract.md#release)
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

###  release

▸ **release**<**K**>(`name`: K): *void*

**Type parameters:**

▪ **K**: *keyof MappingsList*

**Parameters:**

Name | Type |
------ | ------ |
`name` | K |

**Returns:** *void*

▸ **release**(`name`: string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

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
