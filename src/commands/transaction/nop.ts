import { cli } from 'cli-ux'

import { BaseCommand } from '../../base'

export default class NopCommand extends BaseCommand {
  static description = `Generates a transaction that does nothing with the given private key.`

  static flags = {
    ...BaseCommand.flags,
  }

  static args = [
    {
      name: 'pk',
      required: true,
      description: 'The private key.',
    },
  ]

  static examples = [
    'eth transaction:nop 3daa79a26454a5528a3523f9e6345efdbd636e63f8c24a835204e6ccb5c88f9e',
  ]

  static aliases = ['tx:nop']

  async run() {
    const { args, flags } = this.parse(NopCommand)
    let networkUrl

    try {
      networkUrl = this.getNetworkUrl(flags)

      const { pk } = args
      const { generateNop } = await import('../../helpers/generateNop')
      const tx = await generateNop(networkUrl, pk)

      cli.styledJSON(tx)
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
