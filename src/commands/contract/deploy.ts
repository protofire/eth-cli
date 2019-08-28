import { cli } from 'cli-ux'

import { NetworkCommand } from '../../base/network'
import { confirmationBlocksFlag, privateKeyFlag } from '../../flags'
import { awaitTransactionMined } from '../../helpers/transactions'

export class DeployCommand extends NetworkCommand {
  static description = `Deploy contract whose bytecode is in <bin> using private key <pk>.`

  static flags = {
    ...NetworkCommand.flags,
    pk: privateKeyFlag,
    'confirmation-blocks': confirmationBlocksFlag,
  }

  static args = [
    {
      name: 'bin',
      required: true,
      description: 'The bin file of the contract.',
    },
  ]

  static examples = [
    'eth contract:deploy --ropsten --pk 3daa79a26454a5528a3523f9e6345efdbd636e63f8c24a835204e6ccb5c88f9e ./contracts/proxy.bin',
  ]

  static aliases = ['ct:d', 'ct:deploy']

  async run() {
    const { args, flags } = this.parse(DeployCommand)

    let networkUrl

    try {
      networkUrl = this.getNetworkUrl(flags)

      const { bin } = args
      const { pk, 'confirmation-blocks': confirmationBlocks } = flags
      if (!pk) {
        this.error('You have to specify a private key using --pk', { exit: 1 })
        return
      }
      const { deploy } = await import('../../helpers/deploy')
      const txHash = await deploy(networkUrl, pk, bin)

      const receipt = await awaitTransactionMined(networkUrl, txHash, confirmationBlocks)

      cli.styledJSON({ address: receipt.contractAddress, receipt })
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
