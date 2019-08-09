import { Command } from '@oclif/command'

import { isEmptyCommand } from '../../helpers/checkCommandInputs'

export default class ConfCommand extends Command {
  static description = `Allows configuring eth-cli.`

  async run() {
    const { args, flags } = this.parse(ConfCommand)

    // Show help on empty sub command
    if (isEmptyCommand(flags, args)) {
      this._help()
    }
  }
}
