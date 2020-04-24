import { Command } from '@oclif/command'

import { ConfigService, configService } from '../../helpers/config-service'

export class AddCommand extends Command {
  static description = 'Add a known contract.'

  static args = [
    {
      name: 'name',
      required: true,
      description: 'Name of the contract to add',
    },
    {
      name: 'contract',
      required: true,
      description: `The contract's ABI and address, in abi@address format.`,
    },
  ]

  static examples = ['eth contract:add dai erc20@dai']

  async run() {
    const { args } = this.parse(AddCommand)

    try {
      const { name, contract } = args

      const [abi, address] = ConfigService.parseAbiAtAddress(contract)

      configService.addContract(name, abi, address)
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
