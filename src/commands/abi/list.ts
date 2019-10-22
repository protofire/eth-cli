import { Command, flags } from '@oclif/command'

import { getAbiList } from '../../helpers/knownAbis'

export default class ListCommand extends Command {
  static description = 'Display the list of known ABIs.'

  static flags = {
    help: flags.help({ char: 'h' }),
  }

  static examples = ['eth abi:list']

  async run() {
    const abiList = getAbiList()
    const listFormated = abiList.join('\n')
    this.log(listFormated)
  }
}
