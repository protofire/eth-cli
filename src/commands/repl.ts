import inquirer from 'inquirer'
import { flags } from '@oclif/command'
import { NetworkCommand } from '../base/network'
import { privateKeyFlag } from '../flags'
import { configService } from '../helpers/config-service'

export default class ReplCommand extends NetworkCommand {
  static description = `Start a REPL that connects to an RPC node ('localhost:8545' by default).

The started REPL exposes a \`web3\` object that you can use to interact with the
node. There's also an \`eth\` object to save you from typing \`web3.eth\`.

You can also indicate some contracts to load in the REPL; see the examples to
learn how to do this.`

  static strict = false

  static flags = {
    ...NetworkCommand.flags,
    pk: privateKeyFlag,
    interactive: flags.boolean({
      char: 'i',
      required: false,
      default: false,
    }),
  }

  static args = [
    {
      name: 'contracts...',
      description: './path/to/contractABI@address',
    },
  ]

  static examples = [
    'eth repl',
    'eth repl --mainnet',
    'eth repl --url=http://localhost:7545',
    'eth repl ./abis/myContract.json@0xaD2FA57bd95A3dfF0e1728686997F6f2fE67F6f9',
    'eth repl erc20@0x34ee482D419229dAad23f27C44B82075B9418D31 erc721@0xcba140186Fa0436e5155fF6DC909F22Ec4648b12',
  ]

  async run() {
    const { flags, argv } = this.parse(ReplCommand)

    try {

      let network: Maybe<string> = null
      if (flags.interactive) {
        const interactiveSetup = await inquirer
          .prompt([
            {
              type: 'list',
              name: 'network',
              message: 'Which network do you want to use?',
              choices: ['Mainnet', 'Rinkeby']
            }
          ])

        network = interactiveSetup.network
      }

      let networkId: number
      let networkUrl: string
      let networkKind: string
      let networkName: string | undefined
      if (network) {
        networkId = network === 'Mainnet' ? 1 : 4
        networkUrl = network === 'Mainnet' ? 'https://mainnet.infura.io/v3/76fb6c10f1584483a45a0a28e91b07ad' : 'https://rinkeby.infura.io/v3/76fb6c10f1584483a45a0a28e91b07ad'
        networkKind = 'name'
        networkName = network === 'Mainnet' ? 'mainnet' : 'rinkeby'
      } else {
        const { getNetworkId } = await import('../helpers/getNetworkId')
        ;[networkKind, networkUrl, networkName] = this.getNetworkUrlAndKind(flags)
        networkId = await getNetworkId(networkUrl)
      }

      const prompt =
        networkKind === 'url'
        ? networkUrl === NetworkCommand.defaultUrl
        ? '> '
        : `${networkUrl}> `
        : `${networkName || flags.network}> `

      const contracts = argv.map(contract => configService.loadContract(contract, networkId))
      const privateKey = flags.pk

      const { startRepl } = await import('../helpers/startRepl')

      await startRepl(networkUrl, prompt, contracts, privateKey)
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
