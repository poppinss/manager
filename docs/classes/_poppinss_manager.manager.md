[@poppinss/manager](../README.md) > [@poppinss/manager](../modules/_poppinss_manager.md) > [Manager](../classes/_poppinss_manager.manager.md)

# Class: Manager

Manager class implements the Builder pattern to make instance of similar implementations using a fluent API vs importing each class by hand.

This module is used extensively in AdonisJs. For example: `Mail`, `Sessions`, `Auth` and so on.

## Type parameters
#### DriverContract :  `any`
#### DriversList :  `string`
## Hierarchy

**Manager**

## Implements

* [ManagerContract](../interfaces/_poppinss_manager.managercontract.md)<`DriverContract`, `DriversList`>

## Index

### Constructors

* [constructor](_poppinss_manager.manager.md#constructor)

### Properties

* [$cacheDrivers](_poppinss_manager.manager.md#_cachedrivers)
* [$container](_poppinss_manager.manager.md#_container)

### Methods

* [driver](_poppinss_manager.manager.md#driver)
* [extend](_poppinss_manager.manager.md#extend)
* [getDefaultDriver](_poppinss_manager.manager.md#getdefaultdriver)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Manager**($container: *`any`*): [Manager](_poppinss_manager.manager.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| $container | `any` |

**Returns:** [Manager](_poppinss_manager.manager.md)

___

## Properties

<a id="_cachedrivers"></a>

### `<Protected>``<Abstract>` $cacheDrivers

**● $cacheDrivers**: *`boolean`*

Whether or not to cache drivers

___
<a id="_container"></a>

### `<Protected>` $container

**● $container**: *`any`*

___

## Methods

<a id="driver"></a>

###  driver

▸ **driver**(name?: *[DriversList]()*): `DriverContract`

Returns the instance of a given driver. If `name` is not defined the default driver will be resolved.

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` name | [DriversList]() |

**Returns:** `DriverContract`

___
<a id="extend"></a>

###  extend

▸ **extend**(name: *`string`*, callback: *`function`*): `void`

Extend by adding new driver. The compositon of driver is the responsibility of the callback function

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| callback | `function` |

**Returns:** `void`

___
<a id="getdefaultdriver"></a>

### `<Protected>``<Abstract>` getDefaultDriver

▸ **getDefaultDriver**(): `DriversList`

Getting the default driver name, incase a named driver is not fetched

**Returns:** `DriversList`

___

