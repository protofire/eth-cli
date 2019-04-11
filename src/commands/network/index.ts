import { Command } from '@oclif/command'

export default class NetworkCommand extends Command {
  async run() {
    this._help()
  }
}

NetworkCommand.description = `Allows actions with known networks.`

NetworkCommand.examples = ['eth network:urls', 'eth network:ids']
