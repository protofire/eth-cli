import HelpCommand from '../../base/help-command'

export default class ContractCommand extends HelpCommand {
  static aliases = ['ct']

  static description = `Allows actions with contracts.`
}
