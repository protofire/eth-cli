import { Command } from '@oclif/command'

export default class SearchCommand extends Command {
  static description = `Search the given hashed method signature using the 4byte.directory API`

  static args = [
    {
      name: 'hexSignature',
      required: true,
      description: 'The hash of the function signature.',
    },
  ]

  static examples = [`eth method:search a9059cbb`]

  async run() {
    const { args } = this.parse(SearchCommand)

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
