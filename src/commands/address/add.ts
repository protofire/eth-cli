import { Command } from '@oclif/command'
import cli from 'cli-ux'

import { isEmptyCommand } from '../../helpers/checkCommandInputs'
import { getAddresses, updateAddresses } from '../../helpers/config'
import { add0x, isAddress, isPrivateKey } from '../../helpers/utils'

export class AddCommand extends Command {
  static description = 'Add a known address'

  static args = [
    {
      name: 'name',
      required: false,
      description: 'Name of the address to add',
    },
    {
      name: 'addressOrPk',
      required: false,
      description: 'Address or private key of the address',
    },
  ]

  static examples = [
    'eth address:add ganache1 0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d',
  ]

  async run() {
    const { args, flags } = this.parse(AddCommand)

    if (isEmptyCommand(flags, args)) {
      this._help()
      this.exit(1)
    }

    try {
      const { name, addressOrPk } = args

      const addresses = getAddresses()
      if (isPrivateKey(addressOrPk)) {
        const { Accounts } = await import('web3-eth-accounts')
        const accounts = new Accounts()
        const privateKey = add0x(addressOrPk)
        const address = accounts.privateKeyToAccount(privateKey).address

        addresses[name] = { privateKey, address }
      } else if (isAddress(addressOrPk)) {
        const address = add0x(addressOrPk)
        addresses[name] = { address }
      } else {
        this.warn('You have to specify an address or private key')
        this.exit(1)
      }
      updateAddresses(addresses)
      cli.styledJSON(addresses[name])
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
