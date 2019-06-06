import { Command } from '@oclif/command'

import { isEmptyCommand } from '../../helpers/checkCommandInputs'

export default class MethodCommand extends Command {
  static description = `Allows actions with methods.`

  static aliases = ['m']

  async run() {
    const { args, flags } = this.parse(MethodCommand)

    // Show help on empty sub command
    if (isEmptyCommand(flags, args)) {
      this._help()
    }
  }
}
