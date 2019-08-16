import { Command as BaseCommand } from '@oclif/command'

import { isEmptyCommand } from '../helpers/checkCommandInputs'

/**
 * Base command for "partial" commands that, when called, only show their help.
 */
export default class HelpCommand extends BaseCommand {
  async run() {
    const { args, flags } = this.parse(this.constructor as any)

    // Show help on empty sub command
    if (isEmptyCommand(flags, args)) {
      this._help()
    }
  }
}
