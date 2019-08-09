import { Command } from '@oclif/command'

import { isEmptyCommand } from '../../../helpers/checkCommandInputs'

export default class ConfAddressCommand extends Command {
  static description = `Allows managing known addresses.`

  async run() {
    const { args, flags } = this.parse(ConfAddressCommand)

    // Show help on empty sub command
    if (isEmptyCommand(flags, args)) {
      this._help()
    }
  }
}
