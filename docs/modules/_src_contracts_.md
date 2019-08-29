**[@poppinss/manager](../README.md)**

[Globals](../README.md) › ["src/contracts"](_src_contracts_.md)

# External module: "src/contracts"

## Index

### Interfaces

* [ManagerContract](../interfaces/_src_contracts_.managercontract.md)

### Type aliases

* [DriverNode](_src_contracts_.md#drivernode)
* [DriverNodesList](_src_contracts_.md#drivernodeslist)
* [ExtractDefaultDriverConfig](_src_contracts_.md#extractdefaultdriverconfig)
* [ExtractDefaultDriverImpl](_src_contracts_.md#extractdefaultdriverimpl)
* [ExtractDriversConfig](_src_contracts_.md#extractdriversconfig)
* [ExtractDriversImpl](_src_contracts_.md#extractdriversimpl)

## Type aliases

###  DriverNode

Ƭ **DriverNode**: *object*

Shape in which a driver must be defined.

#### Type declaration:

___

###  DriverNodesList

Ƭ **DriverNodesList**: *object*

A list of drivers

#### Type declaration:

* \[ **key**: *string*\]: [DriverNode](_src_contracts_.md#drivernode)‹Implementation, Config›

___

###  ExtractDefaultDriverConfig

Ƭ **ExtractDefaultDriverConfig**: *List[Config["driver"]]["config"]*

Extracts the default driver config. For this type to work,
the config must have a `driver` property and each config
node key must be same as the driver name.

___

###  ExtractDefaultDriverImpl

Ƭ **ExtractDefaultDriverImpl**: *List[Config["driver"]]["implementation"]*

Extracts the default driver implementation. For this type to work,
the config must have a `driver` property and each config node
key must be same as the driver name.

___

###  ExtractDriversConfig

Ƭ **ExtractDriversConfig**: *object*

Extracts the list of config of DriverNodesList

#### Type declaration:

___

###  ExtractDriversImpl

Ƭ **ExtractDriversImpl**: *object*

Extracts the list of implementations of DriverNodesList

#### Type declaration: