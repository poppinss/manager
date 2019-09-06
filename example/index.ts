import {
  ExtractImplementations,
  ExtractConfig,
} from '../src/contracts'

import { Manager } from '../src/Manager'

interface MailDriverContract {
  send (): void
}

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

class SmtpDriver {
  constructor (public config: any) {}
  public send () {}
}

class MailchimpDriver {
  constructor (public config: any) {}
  public send () {}
}

class Mailer extends Manager<
  MailDriverContract,
  ExtractImplementations<MappingsList>
> {
  constructor (container: any, private _config: any) {
    super(container)
  }

  protected $cacheMappings = true

  protected getDefaultMappingName (): string {
    return this._config.mailer
  }

  protected getMappingConfig (name: string): any {
    return this._config.mailers[name]
  }

  protected getMappingDriver (name: string): any {
    return this._config.mailers[name].driver
  }

  protected createSmtp (_name: string, config: any) {
    return new SmtpDriver(config)
  }

  protected createMailchimp (_name: string, config: any) {
    return new MailchimpDriver(config)
  }
}

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

const mailer = new Mailer({}, config)
class Postmark {
  constructor (public config: any) {}
  public send () {}
}

mailer.extend('postmark', (_container, _name, config) => {
  return new Postmark(config)
})

// mailer.use('')
