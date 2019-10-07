import { Command } from '@oclif/command'

import { isEmptyCommand } from '../../helpers/checkCommandInputs'

export default class EventsCommand extends Command {
  static description = `Get the hash of each event in the given ABI.`

  static args = [
    {
      name: 'abi',
      required: false,
      description: 'Contract ABI.',
    },
  ]

  static examples = ['eth abi:events erc20']

  async run() {
    const { args, flags } = this.parse(EventsCommand)

    if (isEmptyCommand(flags, args)) {
      this._help()
      this.exit(1)
    }

    try {
      const { abi } = args

      const { getEvents } = await import('../../helpers/abi')
      const events = getEvents(abi)

      events.forEach(({ signature, signatureHash }) => {
        this.log(`${signatureHash}\t${signature}`)
      })
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
