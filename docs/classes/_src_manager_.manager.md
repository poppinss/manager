**[@poppinss/manager](../README.md)**

[Globals](../README.md) › ["src/Manager"](../modules/_src_manager_.md) › [Manager](_src_manager_.manager.md)

# Class: Manager <**DriverContract, DriversList, DefaultDriver**>

Manager class implements the Builder pattern to make instance of similar
implementations using a fluent API vs importing each class by hand.

This module is used extensively in AdonisJs. For example: `Mail`, `Sessions`,
`Auth` and so on.

## Type parameters

▪ **DriverContract**: *any*

▪ **DriversList**: *object*

▪ **DefaultDriver**: *DriverContract*

## Hierarchy

* **Manager**

## Implements

* [ManagerContract](../interfaces/_src_contracts_.managercontract.md)‹DriverContract, DriversList, DefaultDriver›

## Index

### Constructors

* [constructor](_src_manager_.manager.md#constructor)

### Properties

* [$cacheDrivers](_src_manager_.manager.md#protected-abstract-$cachedrivers)
* [$container](_src_manager_.manager.md#protected-$container)

### Methods

* [driver](_src_manager_.manager.md#driver)
* [extend](_src_manager_.manager.md#extend)
* [getDefaultDriverName](_src_manager_.manager.md#protected-abstract-getdefaultdrivername)

## Constructors

###  constructor

\+ **new Manager**(`$container`: any): *[Manager](_src_manager_.manager.md)*

**Parameters:**

Name | Type |
------ | ------ |
`$container` | any |

**Returns:** *[Manager](_src_manager_.manager.md)*

## Properties

### `Protected` `Abstract` $cacheDrivers

• **$cacheDrivers**: *boolean*

Whether or not to cache drivers

___

### `Protected` $container

• **$container**: *any*

## Methods

###  driver

▸ **driver**<**K**>(`name`: K): *DriversList[K]*

Returns the instance of a given driver. If `name` is not defined
the default driver will be resolved.

**Type parameters:**

▪ **K**: *keyof DriversList*

**Parameters:**

Name | Type |
------ | ------ |
`name` | K |

**Returns:** *DriversList[K]*

▸ **driver**(`name`: string): *DriverContract*

*Implementation of [ManagerContract](../interfaces/_src_contracts_.managercontract.md)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *DriverContract*

▸ **driver**(): *DefaultDriver*

*Implementation of [ManagerContract](../interfaces/_src_contracts_.managercontract.md)*

**Returns:** *DefaultDriver*

___

###  extend

▸ **extend**(`name`: string, `callback`: function): *void*

Extend by adding new driver. The compositon of driver
is the responsibility of the callback function

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

### `Protected` `Abstract` getDefaultDriverName

▸ **getDefaultDriverName**(): *string*

Getting the default driver name, incase a named driver
is not fetched

**Returns:** *string*