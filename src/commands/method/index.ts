import { Command } from '@oclif/command'

import { isEmptyCommand } from '../../helpers/checkCommandInputs'

export default class MethodCommand extends Command {
  async run() {
    const { args, flags } = this.parse(MethodCommand)

    // Show help on empty sub command
    if (isEmptyCommand(flags, args)) {
      this._help()
    }
  }
}

MethodCommand.aliases = ['m']

MethodCommand.description = `Allows actions with methods.`

MethodCommand.examples = [
  'eth method:hash',
  'eth method:encode',
  'eth method:send-transaction',
  'eth method:send',
]
