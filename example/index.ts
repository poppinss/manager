import {
  ExtractMappingsList,
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

class SessionManager<
  Config extends { mapping: keyof Mappings },
> extends Manager<
  SessionDriverContract,
  ExtractMappingsList<Mappings>,
  Mappings[Config['mapping']]['implementation']
> {
  constructor (public config: Config) {
    super({})
  }

  protected $cacheMappings = false

  protected getDefaultMappingName (): string {
    return this.config.mapping
  }

  protected getMappingConfig (name: string): any {
    return this.config[name].config
  }

  protected getMappingDriver (name: string): any {
    return this.config[name].driver
  }
}

type Mappings = {
  file: {
    driver: 'file',
    implementation: SessionFileDriver,
  },
  redis: {
    driver: 'redis',
    implementation: SessionRedisDriver,
  },
}

type MappingsToConfig = { [P in keyof Mappings]: Omit<Mappings[P], 'implementation'> }

const config: { mapping: 'file', mappings: MappingsToConfig } = {
  mapping: 'file',
  mappings: {
    file: {
      driver: 'file',
    },
    redis: {
      driver: 'redis',
    },
  },
}

const session = new SessionManager(config)
session.use()
