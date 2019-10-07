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
    }),
  }

  getNetworkUrl(flags: { [key in keyof typeof NetworkCommand.flags]: any }): string {
    const [, url] = this.getNetworkUrlAndKind(flags)
    return url
  }

  getNetworkUrlAndKind(
    flags: { [key in keyof typeof NetworkCommand.flags]: any },
  ): ['name' | 'url', string] {
    const networks = getNetworks()
    const name = flags.network
    if (networks[name]) {
      return ['name', networks[name].url]
    }

    return ['url', flags.network]
  }
}
