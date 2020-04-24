import { Command } from '@oclif/command'

import { configService } from '../../helpers/config-service'

export default class MethodsCommand extends Command {
  static description = `Show the list of methods in the given ABI.`

  static args = [
    {
      name: 'abi',
      required: true,
      description: 'Contract ABI.',
    },
  ]

  static examples = ['eth abi:methods ../contracts/proxy.abi', 'eth abi:methods erc20']

  async run() {
    const { args } = this.parse(MethodsCommand)

    try {
      const { abi } = args

      const methods = configService.getMethods(abi)

      methods.forEach(({ signature, signatureHash }) => {
        this.log(`${signatureHash}\t${signature}`)
      })
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
