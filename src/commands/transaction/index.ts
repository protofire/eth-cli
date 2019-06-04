import { Command } from '@oclif/command'

import { isEmptyCommand } from '../../helpers/checkCommandInputs'

export default class TxCommand extends Command {
  static description = 'Allows actions with transactions.'

  static aliases = ['tx']

  async run() {
    const { args, flags } = this.parse(TxCommand)

    // Show help on empty sub command
    if (isEmptyCommand(flags, args)) {
      this._help()
    }
  }
}
