import { Command } from '@oclif/command'
import cli from 'cli-ux'

import { config } from '../../helpers/config'

export class ListCommand extends Command {
  static description = 'List known addresses'

  static examples = ['eth address:list']

  async run() {
    const addresses = config.get('addresses', {})
    cli.styledJSON(Object.keys(addresses))
  }
}
