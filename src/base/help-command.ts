import { Command as BaseCommand } from '@oclif/command'

import { isEmptyCommand } from '../helpers/checkCommandInputs'

export default class HelpCommand extends BaseCommand {
  async run() {
    const { args, flags } = this.parse(this.constructor as any)

    // Show help on empty sub command
    if (isEmptyCommand(flags, args)) {
      this._help()
    }
  }
}
