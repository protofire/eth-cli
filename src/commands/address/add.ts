import { Command, flags } from '@oclif/command'
import cli from 'cli-ux'

import { configService } from '../../helpers/config-service'
import { add0x, isAddress, isPrivateKey } from '../../helpers/utils'

export class AddCommand extends Command {
  static description = 'Add a known address.'

  static args = [
    {
      name: 'name',
      required: true,
      description: 'Name of the address to add',
    },
    {
      name: 'addressOrPk',
      required: true,
      description: 'Address or private key of the address',
    },
  ]

  static flags = {
    'network-id': flags.string({
      char: 'n',
      required: false,
      default: '*',
    }),
  }

  static examples = [
    'eth address:add ganache 0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d',
    'eth address:add dai 0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359 -n 1',
  ]

  async run() {
    const { args, flags } = this.parse(AddCommand)

    try {
      const { name, addressOrPk } = args
      const { 'network-id': networkId } = flags

      const addresses = configService.getAddresses()
      let addressObject = null
      if (isPrivateKey(addressOrPk)) {
        const Accounts = (await import('web3-eth-accounts')).default
        const accounts = new Accounts()
        const privateKey = add0x(addressOrPk)
        const address = accounts.privateKeyToAccount(privateKey).address

        addressObject = { privateKey, address }
      } else if (isAddress(addressOrPk)) {
        const address = add0x(addressOrPk)
        addressObject = { address }
      } else {
        this.warn('You have to specify an address or private key')
        this.exit(1)
        return
      }
      addresses[name] = addresses[name] || {}
      addresses[name][networkId] = addressObject
      configService.updateAddresses(addresses)
      cli.styledJSON(addressObject)
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
