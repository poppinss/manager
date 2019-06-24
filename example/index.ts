import {
  DriverNodesList,
  ExtractDriversConfig,
  ExtractDefaultDriverImpl,
  ExtractDriversImpl,
} from '../src/contracts'

import { Manager } from '../src/Manager'

/**
 * Each driver must adhere to this contract
 */
interface SessionDriverContract {
  write (): void
  read (): string
}

/**
 * Redis driver
 */
class SessionRedisDriver implements SessionDriverContract {
  public write () {}
  public read () {
    return 'foo'
  }
}

/**
 * File driver
 */
class SessionFileDriver implements SessionDriverContract {
  public write () {}
  public read () {
    return 'foo'
  }
}

class SessionManager <
  /**
   * Accept a list of driver and each driver must adhere to the
   * Session driver contract
   */
  DriversList extends DriverNodesList<SessionDriverContract, any>,

  /**
   * Receive conventional config object. The driver value is a string and must
   * one of drivers name.
   */
  Config extends { driver: keyof DriversList } & ExtractDriversConfig<DriversList>,

  /**
   * Pulling the default driver as per the config. The default driver is used
   * when no other driver is defined.
   */
  DefaultDriver extends ExtractDefaultDriverImpl<DriversList, Config> = ExtractDefaultDriverImpl<DriversList, Config>
> extends Manager<
  SessionDriverContract,
  ExtractDriversImpl<DriversList>,
  DefaultDriver
> {
  constructor (public config: Config) {
    super({})
  }

  protected $cacheDrivers = false

  protected getDefaultDriverName (): Config['driver'] {
    return this.config.driver as Config['driver']
  }
}

type Drivers = {
  file: {
    config: any,
    implementation: SessionFileDriver,
  },
  redis: {
    config: any,
    implementation: SessionRedisDriver,
  },
}

const config = {
  driver: 'file' as 'file',
  file: {},
}

const session = new SessionManager<Drivers, typeof config>(config)

// Instance of file driver
session.driver()

// Instance of redis driver
session.driver('redis')

// Instance of file driver
session.driver('file')
