import { Command } from '@oclif/command'
import cli from 'cli-ux'

import { getAddresses } from '../../helpers/config'

export class ListCommand extends Command {
  static description = 'List known addresses'

  static examples = ['eth address:list']

  async run() {
    const addresses = getAddresses()
    cli.styledJSON(Object.keys(addresses))
  }
}
