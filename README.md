<div align="center">
  <img src="https://res.cloudinary.com/adonisjs/image/upload/q_100/v1557762307/poppinss_iftxlt.jpg" width="600px">
</div>

# Manager/Builder pattern
This module exposes a class making it easier to implement builder pattern to your classes.

[![circleci-image]][circleci-url] [![npm-image]][npm-url] ![](https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of contents

- [Usage](#usage)
- [Usage](#usage-1)
- [How it works?](#how-it-works)
    - [Drivers](#drivers)
    - [Session main class](#session-main-class)
    - [Usage](#usage-2)
- [Using Manager class](#using-manager-class)
- [Adding drivers from outside](#adding-drivers-from-outside)
- [Autocomplete drivers list](#autocomplete-drivers-list)
- [Change log](#change-log)
- [Contributing](#contributing)
- [Authors & License](#authors--license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Usage
## Usage
Install the package from npm as follows:

```sh
npm i @poppinss/manager

# yarn
yarn add @poppinss/manager
```

and then import it as follows. Check [How it works](#how-it-works) section for complete docs

```ts
import { Manager, ManagerContract } from '@poppinss/manager'
```

## How it works?
[Builder pattern](https://dzone.com/articles/design-patterns-the-builder-pattern) is a way to compose objects by hiding most of their complexities. Similarly, the Manager pattern also manages the lifecycle of those objects, after composing them.

AdonisJs heavily makes use of this pattern in modules like `Mail`, `Auth`, `Session` and so on, where you can switch between multiple drivers, without realizing the amount of work done behind the scenes.

Let's see how the driver's based approach works without the Manager pattern.

#### Drivers
```ts
class SessionRedisDriver {
  public write () {}
  public read () {}
}

class SessionFileDriver {
  public write () {}
  public read () {}
}
```

#### Session main class
```ts
class Session {
  constructor (private _driver) {
  }

  put () {
    this._driver.put()
  }
}
```

#### Usage
Now, you can use it as follows.

```ts
const file = new SessionFileDriver()
const session = new Session(file)
session.put('')
```

The above example is very simple and may feel fine at first glance. However, you will may following challenges.

1. It is not easy to switch drivers, since you have to manually re-create the driver and then create instance of the session class.
2. If you want to use singleton instances, then you need to wrap all this code inside a seperate file, that exports the singleton.
3. If creating a driver has more dependencies, then you will have to construct all those dependencies by hand.

## Using Manager class
Continuing to the same example, let's create a Manager class that abstracts away all of this manual boilerplate.

```ts
import { Manager } from '@poppinss/manager'

class SessionManager extends Manager<Session> {
  protected defaultDriver () {
    return 'file'
  }

  // Create singleton instances and re-use them
  protected $cacheDrivers = true

  protected createFile () {
    return new Session(new SessionFileDriver())
  }

  protected createRedis () {
    return new Session(new SessionRedisDriver())
  }
}
```

and now, you can use it as follows.

```ts
const session = new SessionManager()
session.driver('file')      // redis instance
session.driver('redis')     // file instance
```

## Adding drivers from outside
Also, the session manager can be extended to add more dynamic drivers. Think of accepting plugins to add drivers.

```ts
const session = new SessionManager()
session.extend('mongo', () => {
  return new SessionMongoDriver()
})

session.driver('mongo') // MongoDriver
```

## Autocomplete drivers list
Also, you can pass a union to the `Manager` constructor and it will typehint the list of drivers for you.

```ts
class SessionManager extends Manager<Session, ('file' | 'redis')> {
}

new SessionManager
  .driver('') // typehints 'file' and 'redis'
```

## Change log

The change log can be found in the [CHANGELOG.md](CHANGELOG.md) file.

## Contributing

Everyone is welcome to contribute. Please go through the following guides, before getting started.

1. [Contributing](https://adonisjs.com/contributing)
2. [Code of conduct](https://adonisjs.com/code-of-conduct)


## Authors & License
[Harminder virk](https://github.com/Harminder virk) and [contributors](https://github.com/poppinss/manager/graphs/contributors).

MIT License, see the included [MIT](LICENSE.md) file.

[circleci-image]: https://img.shields.io/circleci/project/github/poppinss/manager/master.svg?style=for-the-badge&logo=circleci
[circleci-url]: https://circleci.com/gh/poppinss/manager "circleci"

[npm-image]: https://img.shields.io/npm/v/@poppinss/manager.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/@poppinss/manager "npm"
