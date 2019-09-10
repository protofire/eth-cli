import { Command } from '@oclif/command'

import { isEmptyCommand } from '../../helpers/checkCommandInputs'

export default class MethodsCommand extends Command {
  static description = `Get the hash of each method in the given ABI.`

  static args = [
    {
      name: 'abi',
      required: false,
      description: 'Contract ABI.',
    },
  ]

  static examples = ['eth abi:methods ../contracts/proxy.abi']

  static aliases = ['me']

  async run() {
    const { args, flags } = this.parse(MethodsCommand)

    if (isEmptyCommand(flags, args)) {
      this._help()
      this.exit(1)
    }

    try {
      const { abi } = args

      const { getMethods } = await import('../../helpers/getMethods')
      const methods = getMethods(abi)

      methods.forEach(({ signature, signatureHash }) => {
        this.log(`${signatureHash}\t${signature}`)
      })
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
