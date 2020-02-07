[@poppinss/manager](../README.md) › ["src/Manager"](../modules/_src_manager_.md) › [Manager](_src_manager_.manager.md)

# Class: Manager <**DriverContract, ReturnValueContract, MappingsList, DefaultItem**>

Manager class implements the Builder pattern to make instance of similar
implementations using a fluent API vs importing each class by hand.

This module is used extensively in AdonisJs. For example: `Mail`, `Sessions`,
`Auth` and so on.

## Type parameters

▪ **DriverContract**: *any*

▪ **ReturnValueContract**: *any*

▪ **MappingsList**: *object*

▪ **DefaultItem**: *ReturnValueContract*

## Hierarchy

* **Manager**

## Implements

* [ManagerContract](../interfaces/_src_contracts_.managercontract.md)‹DriverContract, ReturnValueContract, MappingsList, DefaultItem›

## Index

### Constructors

* [constructor](_src_manager_.manager.md#constructor)

### Properties

* [$cacheMappings](_src_manager_.manager.md#protected-abstract-cachemappings)
* [$container](_src_manager_.manager.md#protected-container)

### Methods

* [extend](_src_manager_.manager.md#extend)
* [getDefaultMappingName](_src_manager_.manager.md#protected-abstract-getdefaultmappingname)
* [getMappingConfig](_src_manager_.manager.md#protected-abstract-getmappingconfig)
* [getMappingDriver](_src_manager_.manager.md#protected-abstract-getmappingdriver)
* [release](_src_manager_.manager.md#release)
* [use](_src_manager_.manager.md#use)
* [wrapDriverResponse](_src_manager_.manager.md#protected-wrapdriverresponse)

## Constructors

###  constructor

\+ **new Manager**(`$container`: any): *[Manager](_src_manager_.manager.md)*

**Parameters:**

Name | Type |
------ | ------ |
`$container` | any |

**Returns:** *[Manager](_src_manager_.manager.md)*

## Properties

### `Protected` `Abstract` $cacheMappings

• **$cacheMappings**: *boolean*

Whether or not to cache mappings

___

### `Protected` $container

• **$container**: *any*

## Methods

###  extend

▸ **extend**(`name`: string, `callback`: function): *void*

Extend by adding new driver. The compositon of driver
is the responsibility of the callback function

**Parameters:**

▪ **name**: *string*

▪ **callback**: *function*

▸ (`container`: any, `mappingName`: string, `config`: any): *DriverContract*

**Parameters:**

Name | Type |
------ | ------ |
`container` | any |
`mappingName` | string |
`config` | any |

**Returns:** *void*

___

### `Protected` `Abstract` getDefaultMappingName

▸ **getDefaultMappingName**(): *string*

Getting the default mapping name, incase a mapping
is not defined

**Returns:** *string*

___

### `Protected` `Abstract` getMappingConfig

▸ **getMappingConfig**(`mappingName`: string): *any | undefined*

Getting config for the mapping. It is required for making
extended drivers

**Parameters:**

Name | Type |
------ | ------ |
`mappingName` | string |

**Returns:** *any | undefined*

___

### `Protected` `Abstract` getMappingDriver

▸ **getMappingDriver**(`mappingName`: string): *string | undefined*

Getting the driver name for the mapping

**Parameters:**

Name | Type |
------ | ------ |
`mappingName` | string |

**Returns:** *string | undefined*

___

###  release

▸ **release**<**K**>(`name`: K): *void*

Removes the mapping from internal cache.

**Type parameters:**

▪ **K**: *keyof MappingsList*

**Parameters:**

Name | Type |
------ | ------ |
`name` | K |

**Returns:** *void*

▸ **release**(`name`: string): *void*

*Implementation of [ManagerContract](../interfaces/_src_contracts_.managercontract.md)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *void*

___

###  use

▸ **use**<**K**>(`name`: K): *MappingsList[K]*

Returns the instance of a given driver. If `name` is not defined
the default driver will be resolved.

**Type parameters:**

▪ **K**: *keyof MappingsList*

**Parameters:**

Name | Type |
------ | ------ |
`name` | K |

**Returns:** *MappingsList[K]*

▸ **use**(`name`: string): *ReturnValueContract*

*Implementation of [ManagerContract](../interfaces/_src_contracts_.managercontract.md)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *ReturnValueContract*

▸ **use**(): *DefaultItem*

*Implementation of [ManagerContract](../interfaces/_src_contracts_.managercontract.md)*

**Returns:** *DefaultItem*

___

### `Protected` wrapDriverResponse

▸ **wrapDriverResponse**(`_`: string, `value`: DriverContract): *ReturnValueContract*

Optional method to wrap the driver response

**Parameters:**

Name | Type |
------ | ------ |
`_` | string |
`value` | DriverContract |

**Returns:** *ReturnValueContract*
