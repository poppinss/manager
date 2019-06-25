> ## [@poppinss/manager](../README.md)

[@poppinss/manager](_poppinss_manager.md) /

# External module: @poppinss/manager

### Index

#### Classes

* [Manager](../classes/_poppinss_manager.manager.md)

#### Interfaces

* [ManagerContract](../interfaces/_poppinss_manager.managercontract.md)

#### Type aliases

* [DriverNode](_poppinss_manager.md#drivernode)
* [DriverNodesList](_poppinss_manager.md#drivernodeslist)
* [ExtractDefaultDriverConfig](_poppinss_manager.md#extractdefaultdriverconfig)
* [ExtractDefaultDriverImpl](_poppinss_manager.md#extractdefaultdriverimpl)
* [ExtractDriversConfig](_poppinss_manager.md#extractdriversconfig)
* [ExtractDriversImpl](_poppinss_manager.md#extractdriversimpl)

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

● \[■&#x60; key&#x60;: *string*\]: [DriverNode](_poppinss_manager.md#drivernode)‹*`Implementation`*, *`Config`*›

___

###  ExtractDefaultDriverConfig

Ƭ **ExtractDefaultDriverConfig**: *`List[Config["driver"]]["config"]`*

Extracts the default driver config. For this type to work,
the config must have a `driver` property and each config
node key must be same as the driver name.

___

###  ExtractDefaultDriverImpl

Ƭ **ExtractDefaultDriverImpl**: *`List[Config["driver"]]["implementation"]`*

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

___