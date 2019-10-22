import { Command } from '@oclif/command'

export default class EventsCommand extends Command {
  static description = `Show the list of events in the given ABI.`

  static args = [
    {
      name: 'abi',
      required: true,
      description: 'Contract ABI.',
    },
  ]

  static examples = ['eth abi:events erc20']

  async run() {
    const { args } = this.parse(EventsCommand)

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
