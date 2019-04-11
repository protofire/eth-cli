import { Command } from '@oclif/command'

export default class MethodsCommand extends Command {
  async run() {
    const { args } = this.parse(MethodsCommand)

    try {
      const { abi } = args

      const { getMethods } = await import('../helpers/getMethods')
      const methods = getMethods(abi)

      methods.forEach(({ signature, signatureHash }: any) => {
        this.log(`${signatureHash}\t${signature}`)
      })
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}

MethodsCommand.aliases = ['me']

MethodsCommand.description = `Get the hash of each method in the given ABI.`

MethodsCommand.args = [
  {
    name: 'abi',
    required: true,
    description: 'Contract ABI.'
  }
]

MethodsCommand.examples = ['eth methods ../contracts/proxy.abi']
