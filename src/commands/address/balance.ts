import { NetworkCommand } from '../../base/network'
import { convert } from '../../helpers/convert'
import { Unit } from '../../types'

export default class BalanceCommand extends NetworkCommand {
  static description = `Get the balance for the given address`

  static args = [
    {
      name: 'address',
      required: true,
      description: 'Address or name of a known address',
    },
  ]

  static flags = {
    ...NetworkCommand.flags,
  }

  static examples = ['eth address:balance 0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1']

  async run() {
    const { args, flags } = this.parse(BalanceCommand)
    const { address } = args

    let networkUrl

    try {
      networkUrl = this.getNetworkUrl(flags)

      const { getBalance } = await import('../../helpers/getBalance')
      const balance = await getBalance(address, networkUrl)
      const balanceInEth = convert(balance, Unit.Wei, Unit.Eth)

      this.log(balanceInEth)
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
