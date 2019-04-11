import { Command } from '@oclif/command'

import { networkConstants } from '../helpers/networks'

export abstract class BaseCommand extends Command {
  getNetworkUrl(flags: {[name: string]: string}) {
    const { url } = flags

    let networkUrl = url

    Object.keys(flags)
      .filter(arg => networkConstants[arg] && arg) // If option is not set, is false, must be checked
      .forEach(network => {
        networkUrl = networkConstants[network].url
      })

    if (!networkUrl) {
      throw new Error('The url arg must be specified')
    }

    return networkUrl
  }
}
