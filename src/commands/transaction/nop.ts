import { cli } from 'cli-ux'

import { NetworkCommand } from '../../base/network'
import { confirmationBlocksFlag, privateKeyFlag } from '../../flags'
import { isEmptyCommand } from '../../helpers/checkCommandInputs'
import { awaitTransactionMined } from '../../helpers/transactions'

export default class NopCommand extends NetworkCommand {
  static description = `Generates a transaction that does nothing with the given private key.`

  static flags = {
    ...NetworkCommand.flags,
    pk: { ...privateKeyFlag, required: false },
    'confirmation-blocks': confirmationBlocksFlag,
  }

  static examples = [
    'eth transaction:nop --pk 3daa79a26454a5528a3523f9e6345efdbd636e63f8c24a835204e6ccb5c88f9e',
    'ETH_CLI_PRIVATE_KEY=3daa79a26454a5528a3523f9e6345efdbd636e63f8c24a835204e6ccb5c88f9e eth transaction:nop',
  ]

  static aliases = ['tx:nop']

  async run() {
    const { flags } = this.parse(NopCommand)

    if (isEmptyCommand(flags, {})) {
      this._help()
      this.exit(1)
    }

    let networkUrl

    try {
      networkUrl = this.getNetworkUrl(flags)

      const { 'confirmation-blocks': confirmationBlocks, pk } = flags
      const { generateNop } = await import('../../helpers/generateNop')
      const tx = await generateNop(networkUrl, pk!)

      await awaitTransactionMined(networkUrl, tx, confirmationBlocks)

      cli.styledJSON(tx)
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
