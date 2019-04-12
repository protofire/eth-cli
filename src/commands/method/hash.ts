import { Command } from '@oclif/command'
import { keccak } from 'ethereumjs-util'

export default class HashCommand extends Command {
  async run() {
    const { args } = this.parse(HashCommand)

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

HashCommand.aliases = ['m:hs', 'm:h']

HashCommand.description = `Get the hash of the given method.`

HashCommand.args = [
  {
    name: 'signature',
    required: true,
    description: 'The given signature.',
  },
]

HashCommand.examples = [`eth method:hash 'transfer(address,uint256)'`]
