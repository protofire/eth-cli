import { flags } from '@oclif/command'
import { cli } from 'cli-ux'

import { NetworkCommand } from '../../base/network'
import { confirmationBlocksFlag, privateKeyFlag } from '../../flags'
import { awaitTransactionMined } from '../../helpers/transactions'
import { configService } from '../../helpers/config-service'

export class DeployCommand extends NetworkCommand {
  static description = `Deploy contract with the given binary.`

  static flags = {
    ...NetworkCommand.flags,
    pk: privateKeyFlag,
    'confirmation-blocks': confirmationBlocksFlag,
    args: flags.string({
      description: "Arguments for the contract's constructor.",
    }),
    abi: flags.string({
      description: 'ABI of the contract. Required when using --args.',
    }),
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
    'eth contract:deploy --pk knownPK --abi erc20 --args ["MYTKN", 18] ./contracts/erc20.bin',
  ]

  static aliases = ['ct:d', 'ct:deploy']

  async run() {
    const { args, flags } = this.parse(DeployCommand)

    let networkUrl

    try {
      networkUrl = this.getNetworkUrl(flags)

      const { bin } = args
      const {
        pk,
        'confirmation-blocks': confirmationBlocks,
        args: constructorArgumentsStr,
        abi: abiPath,
      } = flags
      if (!pk) {
        this.error('You have to specify a private key using --pk', { exit: 1 })
        return
      }

      if (constructorArgumentsStr && !abiPath) {
        this.error('The --abi flags has to be specified when using --args', { exit: 1 })
        return
      }

      let constructorArguments = []
      if (constructorArgumentsStr) {
        try {
          constructorArguments = JSON.parse(constructorArgumentsStr)
          if (!Array.isArray(constructorArguments)) {
            throw new Error('Given arguments are not an array')
          }
        } catch (e) {
          this.error(`Constructor arguments must be a valid JSON array: ${e.message}`, { exit: 1 })
          return
        }
      }

      let abi = []
      if (abiPath) {
        const { abi: loadedAbi } = configService.loadABI(abiPath)
        abi = loadedAbi
      }

      const { deploy } = await import('../../helpers/deploy')
      const txHash = await deploy(networkUrl, pk, abi, bin, constructorArguments)

      const receipt = await awaitTransactionMined(networkUrl, txHash, confirmationBlocks)

      cli.styledJSON({ address: receipt.contractAddress, receipt })
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
