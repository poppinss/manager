<div align="center">
  <img src="https://res.cloudinary.com/adonisjs/image/upload/q_100/v1557762307/poppinss_iftxlt.jpg" width="600px">
</div>

# Manager/Builder pattern
> Abstract class to incapsulate the behavior of constructing and re-using named objects.

[![circleci-image]][circleci-url] [![typescript-image]][typescript-url] [![npm-image]][npm-url] [![license-image]][license-url]

The module is used heavily by AdonisJs to build it's driver based features for components like `hash`, `mail`, `auth`, `social auth` and so on.

If you are a user of AdonisJs, then you will be familiar with the following API.

```ts
mail.use('smtp').send()

// or
hash.use('argon2').hash('')
```

The `use` method here constructs the driver for the mapping defined in the config file with the ability to cache the constructed drivers and add new drivers using the `extend` API.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Release mapping from cache](#release-mapping-from-cache)
- [Extending drivers](#extending-drivers)
- [What is container?](#what-is-container)
- [Typescript types](#typescript-types)
  - [Driver interface](#driver-interface)
  - [`use` method intellisense](#use-method-intellisense)
    - [Typed config](#typed-config)
    - [Updating mapping list generic for Manager](#updating-mapping-list-generic-for-manager)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

Install the package from npm registry as follows:

```sh
npm i @poppinss/manager

# yarn
yarn add @poppinss/manager
```

## Usage

Let's imagine we are building a mailer (with dummy implementation) that supports multiple drivers and each driver can be used for multiple times. Example config for same

```js
{
  mailer: 'transactional',
  
  mailers: {
    transactional: {
      👇 // driver is important
      driver: 'smtp',
      host: '',
      user: '',
      password: ''
    },
    
    promotional: {
      driver: 'mailchimp',
      apiKey: ''
    }
  }
}
```

Our module supports two drivers `smtp` and `mailchimp` and here's how we can construct them.

```ts
class SmtpDriver {
  constructor (config) {}
  
  send () {}
}
```

```ts
class MailchimpDriver {
  constructor (config) {}
  
  send () {}
}
```

The consumer of our code can import and use these drivers manually by constructing a new instance every time. However, we can improve the developer experience, by creating the following manager class.

```ts
import { Manager } from '@poppinss/manager'

class Mailer extends Manager {
  constructor (container, private config) {
    super(container)
  }
 
  protected $cacheMappings = true
  
  protected getDefaultMappingName (): string {
    return this.config.mailer
  }

  protected getMappingConfig (name): any {
    return this.config.mailers[name]
  }

  protected getMappingDriver (name): any {
    return this.config.mailers[name].driver
  }
  
  protected createSmtp (name, config) {
    return new Smtp(config)
  }

  protected createMailchimp (name, config) {
    return new MailchimpDriver(config)
  }
}
```

The `Manager` class forces the parent class to define some of the required methods/properties.

- **$cacheMappings**: When set to true, the manager will internally cache the instance of drivers and will re-use them.
- **getDefaultMappingName**: The name of the default mapping. In this case, it is the name of the `mailer` set in the config
- **getMappingConfig**: Returning the config for a mapping. We pull it from the `mailers` object defined in the config.
- **getMappingDriver**: Returning the driver for a mapping inside config.

The other two methods `createSmtp` and `createMailchimp` are the methods invoked when the end user will access a driver. This is how it works.

```ts
const mailer = new Mailer({}, config)
mailer.use('smtp').send()
```

The `mailer.use('transactional')` will invoke `createTransactional` as part of the following convention.

- `create` + `PascalCaseDriverName` 
- `create` + `Smtp` = `createSmtp`
- `create` + `Mailchimp` = `createMailchimp`

> **NOTE**: You need one method for each driver and not the mapping. The mapping names can be anything the user wants to keep in their config file.


## Release mapping from cache
The `release` method can be used release the mappings from cache.

```ts
// Removes smtp from cache. Next call to `use('smtp')` will create a new instance
mailer.release('smtp')
```

## Extending drivers

The manager class also exposes the API to add new drivers from outside in and this is done using the `extend`  method.

```ts
mailer.extend('postmark', (container, name, config) => {
  return new Postmark(config)
})
```

## What is container?

The `Manager` class needs a container value, which is then passed to the `extended` drivers. This can be anything from application state to an empty object. 

In case of AdonisJs, it is the instance of the IoC container, so that the outside world (extended drivers) can pull dependencies from the container.

## Typescript types

In order for intellisense to work, you have to do some ground work of defining additional types. This in-fact is a common theme with static languages, that you have to rely on loose coupling when creating or using extensible objects.

### Driver interface

The first thing you must have in place is the interface that every driver adheres to.

```ts
interface MailDriverContract {
  send (): void
}
```

And then pass it as a generic to the `Manager` constructor

```ts
class Mailer extends Manager<MailDriverContract> {
  // rest of the code
}
```

Now, `extend` method will ensure that all drivers adhere to the `‌MailDriverContract`.

### `use` method intellisense

Currently the output of `use` method will be typed to `MailDriverContract` and not the actual implementation class. This is fine, **when all drivers have the same properties, methods and output**. However, you can define a list of mappings as follows

```ts
type MappingsList = {
  transactional: SmtpDriver,
  promotional: MailchimpDriver,
}
```

And then pass this mapping as a 2nd argument to the `Manager` constructor.

```ts
class Mailer extends Manager<
  MailDriverContract,
  MailDriverContract,
  MappingsList
> {
}
```

The `use` method will now return the concrete type. You can also use this same mapping to enforce correct configuration.

```ts
type SmtpConfig = {
  driver: 'smtp',
  host: string,
  user: string,
  password: string,
  port?: number,
}

type MailchimpConfig = {
  driver: 'mailchimp',
  apiKey: string,
}

type MappingsList = {
  transactional: {
    config: SmtpConfig,
    implementation: SmtpDriver,
  },
  promotional: {
    config: MailchimpConfig,
    implementation: MailchimpDriver,
  },
}
```

The master `MappingsList` will ensure that static types and the configuration is always referring to the same driver instance.

#### Typed config

```ts
import { ExtractConfig } from '@poppinss/manager'


type Config<Mailer extends keyof MappingsList> = {
  mailer: Mailer,
  mailers: ExtractConfig<MappingsList>,
}

const config: Config<'transactional'> = {
  mailer: 'transactional',
  mailers: {
    transactional: {
      driver: 'smtp',
      host: '',
      user: '',
      password: '',
    },

    promotional: {
      driver: 'mailchimp',
      apiKey: '',
    },
  },
}
```

#### Updating mapping list generic for Manager

```ts
import { ExtractImplementations, Manager } from '@poppinss/manager'

class Mailer extends Manager<
  MailDriverContract,
  MailDriverContract,
  ExtractImplementations<MappingsList>
> {
}
```

Finally, you have runtime functionality to switch between multiple mailers and also have type safety for same.

[circleci-image]: https://img.shields.io/circleci/project/github/poppinss/manager/master.svg?style=for-the-badge&logo=circleci
[circleci-url]: https://circleci.com/gh/poppinss/manager "circleci"

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]:  "typescript"

[npm-image]: https://img.shields.io/npm/v/@poppinss/manager.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/@poppinss/manager "npm"

[license-image]: https://img.shields.io/npm/l/@poppinss/manager?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md "license"
