import { NetworkCommand } from '../base/network'
import { privateKeyFlag } from '../flags'

const parseReplContracts = (args: string[]): Array<{ abiPath: string; address: string }> => {
  const result = args.map(arg => {
    const [abiPath, address] = arg.split('@')
    if (!abiPath || !address) {
      throw new Error(`Invalid argument '${arg}', expected <abi>@<contractAddress>`)
    }
    return { abiPath, address }
  })

  return result
}

export default class ReplCommand extends NetworkCommand {
  static description = `
Start a REPL that connects to an RPC node ('localhost:8545' by default).

The started REPL exposes a 'web3' object that you can use to interact with the
node. There's also an 'eth' object to save you from typing 'web3.eth'.

You can also indicate some contracts to load in the REPL; see the examples to
learn how to do this.`

  static strict = false

  static flags = {
    ...NetworkCommand.flags,
    pk: privateKeyFlag,
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
      const [networkUrl, networkFlag] = this.getNetworkUrlAndFlag(flags)
      const prompt =
        networkFlag === 'url'
          ? networkUrl === NetworkCommand.defaultUrl
            ? '> '
            : `${networkUrl}> `
          : `${networkFlag}> `

      const contracts = parseReplContracts(argv)
      const privateKey = flags.pk

      const { startRepl } = await import('../helpers/startRepl')

      await startRepl(networkUrl, prompt, contracts, privateKey)
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
