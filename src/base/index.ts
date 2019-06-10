import { Command, flags } from '@oclif/command'

interface NetworkInfo {
  url: string
  id?: number
  label?: string
}

type NetworkFlag = keyof typeof BaseCommand.flags
type NetworkName = Exclude<NetworkFlag, 'url'>

export abstract class BaseCommand extends Command {
  static flags = {
    url: flags.string(),
    mainnet: flags.boolean({ exclusive: ['url'] }),
    ropsten: flags.boolean({ exclusive: ['url'] }),
    rinkeby: flags.boolean({ exclusive: ['url'] }),
    rsk: flags.boolean({ exclusive: ['url'] }),
    'rsk-testnet': flags.boolean({ exclusive: ['url'] }),
    kovan: flags.boolean({ exclusive: ['url'] }),
    sokol: flags.boolean({ exclusive: ['url'] }),
    poa: flags.boolean({ exclusive: ['url'] }),
    xdai: flags.boolean({ exclusive: ['url'] }),
  }

  static defaultUrl = 'http://localhost:8545'

  static getNetworksInfo(): { [key in NetworkName]: NetworkInfo } {
    return {
      kovan: { url: 'https://kovan.infura.io', id: 42, label: 'Kovan' },
      mainnet: { url: 'https://mainnet.infura.io', id: 1, label: 'Mainnet' },
      poa: { url: 'https://core.poa.network', id: 99, label: 'POA' },
      rinkeby: { url: 'https://rinkeby.infura.io', id: 4, label: 'Rinkeby' },
      ropsten: { url: 'https://ropsten.infura.io', id: 3, label: 'Ropsten' },
      rsk: { url: 'https://public-node.rsk.co', id: 30, label: 'RSK' },
      'rsk-testnet': { url: 'https://public-node.testnet.rsk.co', id: 31, label: 'RSK testnet' },
      sokol: { url: 'https://sokol.poa.network', id: 77, label: 'Sokol' },
      xdai: { url: 'https://dai.poa.network', id: 100, label: 'xDAI' },
    }
  }

  getNetworkUrl(flags: { [key in keyof typeof BaseCommand.flags]: any }): string {
    const [networkUrl] = this.getNetworkUrlAndFlag(flags)
    return networkUrl
  }

  getNetworkUrlAndFlag(
    flags: { [key in keyof typeof BaseCommand.flags]: any },
  ): [string, NetworkFlag] {
    if (flags.url) {
      return [flags.url, 'url']
    }

    const networksInfo = BaseCommand.getNetworksInfo()

    for (const flag of Object.keys(flags) as Array<keyof typeof flags>) {
      if (flag === 'url' || !BaseCommand.flags[flag]) continue

      if (flags[flag]) {
        return [networksInfo[flag].url, flag]
      }
    }

    return [BaseCommand.defaultUrl, 'url']
  }
}
