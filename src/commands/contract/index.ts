import { Command } from '@oclif/command'

import { isEmptyCommand } from '../../helpers/checkCommandInputs'

export default class ContractCommand extends Command {
  static description = `Allows actions with contracts.`

  static aliases = ['ct']

  async run() {
    const { args, flags } = this.parse(ContractCommand)

    // Show help on empty sub command
    if (isEmptyCommand(flags, args)) {
      this._help()
    }
  }
}
