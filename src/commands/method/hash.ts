import { Command } from '@oclif/command'
import { keccak } from 'ethereumjs-util'

import { isEmptyCommand } from '../../helpers/checkCommandInputs'

export default class HashCommand extends Command {
  static description = `Get the hash of the given method.`

  static args = [
    {
      name: 'signature',
      required: false,
      description: 'The given signature.',
    },
  ]

  static examples = [`eth method:hash 'transfer(address,uint256)'`]

  static aliases = ['m:hs', 'm:h']

  async run() {
    const { args, flags } = this.parse(HashCommand)

    if (isEmptyCommand(flags, args)) {
      this._help()
      this.exit(1)
    }

    try {
      const { signature } = args

      const hash = keccak(signature)
        .toString('hex')
        .slice(0, 8)

      this.log(hash)
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
