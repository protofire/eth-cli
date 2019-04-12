import { Command } from '@oclif/command'

import { isEmptyCommand } from '../../helpers/checkCommandInputs'

export default class ContractCommand extends Command {
  async run() {
    const { args, flags } = this.parse(ContractCommand)

    // Show help on empty sub command
    if (isEmptyCommand(flags, args)) {
      this._help()
    }
  }
}

ContractCommand.aliases = ['ct']

ContractCommand.description = `Allows actions with contracts.`

ContractCommand.examples = [
  'eth contract:deploy --ropsten 3daa79a26454a5528a3523f9e6345efdbd636e63f8c24a835204e6ccb5c88f9e ./contracts/proxy.bin',
  'eth contract:load ./contracts/proxy.abi 0x601fd71f284B1933420A5DB0C43B10efC429A008',
  'eth contract:address 0x92970dbD5C0Ee6b439422bFd7cD71e1DDA921A03',
]
