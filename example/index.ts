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
	smtp: Smtp
	mailgun: Mailgun
}

type Mailer = ManagerContract<DriverContract, DriverContract, Mappings>

const a = {} as Mailer
a.use()

// mailer.use('')
