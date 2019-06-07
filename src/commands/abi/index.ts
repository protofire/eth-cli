import { Command } from '@oclif/command'

import { isEmptyCommand } from '../../helpers/checkCommandInputs'

export default class AbiCommand extends Command {
  static description = `Allows actions with abis.`

  async run() {
    const { args, flags } = this.parse(AbiCommand)

    // Show help on empty sub command
    if (isEmptyCommand(flags, args)) {
      this._help()
    }
  }
}
