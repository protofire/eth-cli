const { Command } = require('@oclif/command')

class NetworkCommand extends Command {
  async run() {
    this._help()
  }
}

NetworkCommand.description = `Allows actions with known networks.`

NetworkCommand.examples = ['eth network:urls', 'eth network:ids']

module.exports = NetworkCommand
