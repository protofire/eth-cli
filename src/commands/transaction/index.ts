import HelpCommand from '../../base/help-command'

export default class TxCommand extends HelpCommand {
  static aliases = ['tx']

  static description = 'Allows actions with transactions.'
}
