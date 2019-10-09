import HelpCommand from '../../base/help-command'

export default class TxCommand extends HelpCommand {
  static aliases = ['tx']

  static description = 'Get information about mined transactions or create empty transaction'
}
