import { Command } from '@oclif/command'

import { isEmptyCommand } from '../../helpers/checkCommandInputs'

export default class SearchCommand extends Command {
  static description = `Search the given hashed method signature using the 4byte.directory API`

  static args = [
    {
      name: 'hexSignature',
      required: false,
      description: 'The hash of the function signature.',
    },
  ]

  static examples = [`eth method:search a9059cbb`]

  async run() {
    const { args, flags } = this.parse(SearchCommand)

    if (isEmptyCommand(flags, args)) {
      this._help()
      this.exit(1)
    }

    try {
      const { hexSignature } = args
      const { searchSignature } = await import('../../helpers/searchSignature')
      const result = await searchSignature(hexSignature)

      result.forEach((signature: string) => this.log(signature))
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
