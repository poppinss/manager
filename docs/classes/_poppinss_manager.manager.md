> ## [@poppinss/manager](../README.md)

[@poppinss/manager](../modules/_poppinss_manager.md) / [Manager](_poppinss_manager.manager.md) /

# Class: Manager <**DriverContract, DriversList, DefaultDriver**>

Manager class implements the Builder pattern to make instance of similar
implementations using a fluent API vs importing each class by hand.

This module is used extensively in AdonisJs. For example: `Mail`, `Sessions`,
`Auth` and so on.

## Type parameters

■` DriverContract`: *any*

■` DriversList`: *object*

■` DefaultDriver`: *`DriverContract`*

## Hierarchy

* **Manager**

## Implements

* [ManagerContract](../interfaces/_poppinss_manager.managercontract.md)‹*`DriverContract`*, *`DriversList`*, *`DefaultDriver`*›

### Index

#### Constructors

* [constructor](_poppinss_manager.manager.md#constructor)

#### Properties

* [$cacheDrivers](_poppinss_manager.manager.md#protected-abstract-$cachedrivers)
* [$container](_poppinss_manager.manager.md#protected-$container)

#### Methods

* [driver](_poppinss_manager.manager.md#driver)
* [extend](_poppinss_manager.manager.md#extend)
* [getDefaultDriverName](_poppinss_manager.manager.md#protected-abstract-getdefaultdrivername)

## Constructors

###  constructor

\+ **new Manager**(`$container`: any): *[Manager](_poppinss_manager.manager.md)*

**Parameters:**

Name | Type |
------ | ------ |
`$container` | any |

**Returns:** *[Manager](_poppinss_manager.manager.md)*

___

## Properties

### `Protected` `Abstract` $cacheDrivers

● **$cacheDrivers**: *boolean*

Whether or not to cache drivers

___

### `Protected` $container

● **$container**: *any*

___

## Methods

###  driver

▸ **driver**<**K**>(`name`: `K`): *`DriversList[K]`*

Returns the instance of a given driver. If `name` is not defined
the default driver will be resolved.

**Type parameters:**

■` K`: *keyof DriversList*

**Parameters:**

Name | Type |
------ | ------ |
`name` | `K` |

**Returns:** *`DriversList[K]`*

▸ **driver**(`name`: string): *`DriverContract`*

*Implementation of [ManagerContract](../interfaces/_poppinss_manager.managercontract.md)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *`DriverContract`*

▸ **driver**(): *`DefaultDriver`*

*Implementation of [ManagerContract](../interfaces/_poppinss_manager.managercontract.md)*

**Returns:** *`DefaultDriver`*

___

###  extend

▸ **extend**(`name`: string, `callback`: function): *void*

Extend by adding new driver. The compositon of driver
is the responsibility of the callback function

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

### `Protected` `Abstract` getDefaultDriverName

▸ **getDefaultDriverName**(): *string*

Getting the default driver name, incase a named driver
is not fetched

**Returns:** *string*

___