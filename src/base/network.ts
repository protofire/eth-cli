import { Command, flags } from '@oclif/command'

import { getNetworks } from '../helpers/config'

/**
 * Base command that handles the flags used for specifying the desired network.
 */
export abstract class NetworkCommand extends Command {
  static defaultUrl = 'http://localhost:8545'

  static flags = {
    network: flags.string({
      char: 'n',
      default: NetworkCommand.defaultUrl,
      description: 'URL to connect to, or name of a known network',
    }),
    mainnet: flags.boolean({ hidden: true }),
    ropsten: flags.boolean({ hidden: true }),
    rinkeby: flags.boolean({ hidden: true }),
    goerli: flags.boolean({ hidden: true }),
    kovan: flags.boolean({ hidden: true }),
  }

  getNetworkUrl(flags: { [key in keyof typeof NetworkCommand.flags]: any }): string {
    const [, url] = this.getNetworkUrlAndKind(flags)
    return url
  }

  getNetworkUrlAndKind(
    flags: { [key in keyof typeof NetworkCommand.flags]: any },
  ): ['name' | 'url', string, string?] {
    const networks = getNetworks()
    const name = flags.mainnet
      ? 'mainnet'
      : flags.ropsten
      ? 'ropsten'
      : flags.rinkeby
      ? 'rinkeby'
      : flags.goerli
      ? 'goerli'
      : flags.kovan
      ? 'kovan'
      : flags.network
    if (networks[name]) {
      return ['name', networks[name].url, name]
    }

    return ['url', flags.network]
  }
}
