import { Command } from '@oclif/command'

export default class MethodsCommand extends Command {
  static description = `Get the hash of each method in the given ABI.`

  static args = [
    {
      name: 'abi',
      required: true,
      description: 'Contract ABI.',
    },
  ]

  static examples = ['eth methods ../contracts/proxy.abi']

  static aliases = ['me']

  async run() {
    const { args } = this.parse(MethodsCommand)

    try {
      const { abi } = args

      const { getMethods } = await import('../helpers/getMethods')
      const methods = getMethods(abi)

      methods.forEach(({ signature, signatureHash }) => {
        this.log(`${signatureHash}\t${signature}`)
      })
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
