/**
 * @poppinss/manager
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import test from 'japa'
import { Manager } from '../src/Manager'

interface Mailable {
  send (): void
}

test.group('Manager', () => {
  test('raise error when driver create function doesn\'t exists', (assert) => {
    class Mail extends Manager<Mailable> {
      protected $cacheMappings = false
      protected getDefaultMappingName () {
        return 'smtp'
      }
      protected getMappingConfig () {
        return {}
      }
      protected getMappingDriver () {
        return 'smtp'
      }
    }

    const mail = new Mail({})
    const fn = () => mail.use()

    assert.throw(fn, 'smtp driver is not supported by Mail')
  })

  test('resolve default driver when no name is defined', (assert) => {
    assert.plan(3)
    class Smtp implements Mailable {
      public send () {}
    }

    class Mail extends Manager<Mailable> {
      protected $cacheMappings = false

      protected getDefaultMappingName () {
        return 'smtp'
      }

      protected getMappingConfig () {
        return {}
      }

      protected getMappingDriver () {
        return 'smtp'
      }

      public createSmtp (mapping: string, config: any): Mailable {
        assert.equal(mapping, 'smtp')
        assert.deepEqual(config, {})
        return new Smtp()
      }
    }

    const mail = new Mail({})
    const driver = mail.use()
    assert.instanceOf(driver, Smtp)
  })

  test('resolve named driver when name is defined', (assert) => {
    class Mailgun implements Mailable {
      public send () {}
    }

    class Mail extends Manager<Mailable> {
      protected $cacheMappings = false
      protected getDefaultMappingName () {
        return 'smtp'
      }

      protected getMappingConfig () {
        return {}
      }

      protected getMappingDriver () {
        return 'mailgun'
      }

      public createMailgun (): Mailable {
        return new Mailgun()
      }
    }

    const mail = new Mail({})
    const driver = mail.use('mailgun')
    assert.instanceOf(driver, Mailgun)
  })

  test('raise exception when driver for a mapping is missing', (assert) => {
    class Mailgun implements Mailable {
      public send () {}
    }

    class Mail extends Manager<Mailable> {
      protected $cacheMappings = false
      protected getDefaultMappingName () {
        return 'smtp'
      }

      protected getMappingConfig () {
        return {}
      }

      protected getMappingDriver () {
        return undefined
      }

      public createMailgun (): Mailable {
        return new Mailgun()
      }
    }

    const mail = new Mail({})
    const driver = () => mail.use('mailgun')
    assert.throw(driver, 'Make sure to define driver for mailgun mapping')
  })

  test('extend by adding custom drivers', (assert) => {
    class Ses implements Mailable {
      public send () {}
    }

    class Mail extends Manager<Mailable> {
      protected $cacheMappings = false
      protected getDefaultMappingName () {
        return 'smtp'
      }

      protected getMappingConfig () {
        return {}
      }

      protected getMappingDriver () {
        return 'ses'
      }
    }

    const mail = new Mail({})

    mail.extend('ses', () => {
      return new Ses()
    })

    const driver = mail.use('foo')
    assert.instanceOf(driver, Ses)
  })

  test('save drivers to cache when enabled', (assert) => {
    class Smtp implements Mailable {
      public name: Symbol

      constructor () {
        this.name = Symbol('smtp')
      }

      public send () {}
    }

    class Mail extends Manager<Mailable> {
      protected $cacheMappings = true
      protected getDefaultMappingName () {
        return 'smtp'
      }

      protected getMappingConfig () {
        return {}
      }

      protected getMappingDriver () {
        return 'smtp'
      }

      public createSmtp () {
        return new Smtp()
      }
    }

    const mail = new Mail({})
    const driver = mail.use('smtp')
    const driver1 = mail.use('smtp')
    assert.deepEqual(driver, driver1)
  })

  test('save extended drivers to cache when enabled', (assert) => {
    class Ses implements Mailable {
      public name: Symbol

      constructor () {
        this.name = Symbol('smtp')
      }

      public send () {}
    }

    class Mail extends Manager<Mailable> {
      protected $cacheMappings = true
      protected getDefaultMappingName () {
        return 'smtp'
      }
      protected getMappingConfig () {
        return {}
      }

      protected getMappingDriver () {
        return 'ses'
      }
    }

    const mail = new Mail({})

    mail.extend('ses', () => {
      return new Ses()
    })

    const driver = mail.use('ses')
    const driver1 = mail.use('ses')
    assert.deepEqual(driver, driver1)
  })

  test('remove mapping from cache', (assert) => {
    class Smtp implements Mailable {
      public name: Symbol

      constructor () {
        this.name = Symbol('smtp')
      }

      public send () {}
    }

    class Mail extends Manager<Mailable> {
      protected $cacheMappings = true
      protected getDefaultMappingName () {
        return 'smtp'
      }

      protected getMappingConfig () {
        return {}
      }

      protected getMappingDriver () {
        return 'smtp'
      }

      public createSmtp () {
        return new Smtp()
      }
    }

    const mail = new Mail({})
    mail.use('smtp')
    assert.instanceOf(mail['_mappingsCache'].get('smtp'), Smtp)

    mail.release('smtp')
    assert.equal(mail['_mappingsCache'].size, 0)
  })

  test('wrap driver response to a custom object', (assert) => {
    class Smtp implements Mailable {
      public name: Symbol

      constructor () {
        this.name = Symbol('smtp')
      }

      public send () {}
    }

    class Mail extends Manager<Mailable, { mappingName: string, driver: Mailable }> {
      protected $cacheMappings = true
      protected getDefaultMappingName () {
        return 'smtp'
      }

      protected getMappingConfig () {
        return {}
      }

      protected getMappingDriver () {
        return 'smtp'
      }

      protected wrapDriverResponse (mappingName: string, driver: any) {
        return { mappingName, driver }
      }

      public createSmtp () {
        return new Smtp()
      }
    }

    const mail = new Mail({})
    const mailer = mail.use('smtp')

    assert.deepEqual(mailer, mail['_mappingsCache'].get('smtp'))
    assert.instanceOf(mail['_mappingsCache'].get('smtp')!.driver, Smtp)
    assert.equal(mail['_mappingsCache'].get('smtp')!.mappingName, 'smtp')
  })

  test('wrap extended driver response to a custom object', (assert) => {
    class Smtp implements Mailable {
      public name: Symbol

      constructor () {
        this.name = Symbol('smtp')
      }

      public send () {}
    }

    class Mail extends Manager<Mailable, { mappingName: string, driver: Mailable }> {
      protected $cacheMappings = true
      protected getDefaultMappingName () {
        return 'smtp'
      }

      protected getMappingConfig () {
        return {}
      }

      protected getMappingDriver () {
        return 'smtp'
      }

      protected wrapDriverResponse (mappingName: string, driver: any) {
        return { mappingName, driver }
      }
    }

    const mail = new Mail({})
    mail.extend('smtp', () => {
      return new Smtp()
    })
    const mailer = mail.use('smtp')

    assert.deepEqual(mailer, mail['_mappingsCache'].get('smtp'))
    assert.instanceOf(mail['_mappingsCache'].get('smtp')!.driver, Smtp)
    assert.equal(mail['_mappingsCache'].get('smtp')!.mappingName, 'smtp')
  })
})
