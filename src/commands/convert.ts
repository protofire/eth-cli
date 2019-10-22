import { Command, flags } from '@oclif/command'
import getStdin from 'get-stdin'

import { convert, stringToUnit } from '../helpers/convert'
import { Unit } from '../types'

export class ConvertCommand extends Command {
  static description = 'Convert from eth to wei, wei to eth, etc.'

  static args = [
    {
      name: 'amount',
      required: false,
      description: 'The amount to convert. Can also be specified through stdin.',
    },
  ]

  static flags = {
    from: flags.string({
      char: 'f',
      default: Unit.Wei,
    }),
    to: flags.string({
      char: 't',
      default: Unit.Eth,
    }),
  }

  static examples = [
    'eth convert 1000000000000000000',
    'eth convert -f eth -t wei 1',
    'echo 1000000000000000000 | eth convert',
  ]

  async run() {
    const { args, flags } = this.parse(ConvertCommand)

    let { amount } = args
    const { from: fromRaw, to: toRaw } = flags

    if (!amount) {
      amount = await getStdin()
    }

    const from = stringToUnit(fromRaw)
    const to = stringToUnit(toRaw)

    if (!from) {
      this.error('--from has to be a valid unit (eth, wei, gwei)')
      return
    }
    if (!to) {
      this.error('--to has to be a valid unit (eth, wei, gwei)')
      return
    }

    try {
      const converted = convert(amount.trim(), from, to)
      this.log(converted)
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
