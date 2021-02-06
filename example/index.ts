import { ManagerContract } from '../src/Contracts'

interface DriverContract {
  run(): string
}

interface Smtp extends DriverContract {
  send(): void
}

interface Mailgun extends DriverContract {
  verifyAndSend(): void
}

type Mappings = {
  promotional: Smtp
  transactional: Mailgun
}

type Mailer = ManagerContract<any, DriverContract, DriverContract, Mappings>

const mailer = {} as Mailer
mailer.use('transactional')
