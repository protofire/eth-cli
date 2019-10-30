import { Command, flags } from '@oclif/command'
import { cli } from 'cli-ux'

export class RandomCommand extends Command {
  static description = `Generate a random Ethereum address with its private key.`

  static args = [
    {
      name: 'amount',
      required: false,
      default: '1',
      description: 'Can be specified to generate a list of addresses.',
    },
  ]

  static flags = {
    prefix: flags.string({
      description: 'Prefix of the generated address. The more characters used, the longer it will take to generate it.'
    }),
    password: flags.boolean({
      description: 'Ask for a password and generate a keystore with it. Only 1 address can be generated when this flags is used.'
    }),
  }

  static examples = ['eth address:random', 'eth address:random 3', 'eth address:random --prefix aa']

  async run() {
    const { args, flags } = this.parse(RandomCommand)

    const { amount = '1' } = args
    const { prefix = '', password: promptForPassword = '' } = flags

    const amountNumber = parseInt(amount, 10)

    if (promptForPassword && amountNumber > 1) {
      this.error('Only 1 address can be generated when --password is used')
    }

    try {
      const { randomAddress, generateKeystore } = await import('../../helpers/randomAddress')

      if (promptForPassword) {
        const password = await cli.prompt('Password', { type: 'hide' })
        const [{privateKey}] = randomAddress(1, prefix)
        const keystore = await generateKeystore(privateKey, password)
        cli.styledJSON(keystore)
      } else {
        randomAddress(amountNumber, prefix).forEach(({ address, privateKey }) =>
          cli.styledJSON({ address, privateKey }),
        )
      }

    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
