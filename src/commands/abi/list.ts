import { Command, flags } from '@oclif/command'

import { getAbiList } from '../../helpers/knownAbis'

export default class ListCommand extends Command {
  static description = 'Displays the list of known-abis'

  static flags = {
    help: flags.help({ char: 'h' }),
  }

  static examples = ['eth abi:list']

  async run() {
    const abiList = getAbiList()
    const listFormated = abiList.join().replace(',', '\n');
    this.log(listFormated)
  }
}
