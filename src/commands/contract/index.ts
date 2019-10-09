import HelpCommand from '../../base/help-command'

export default class ContractCommand extends HelpCommand {
  static aliases = ['ct']

  static description = 'Deploy contracts or predict their addresses'
}
