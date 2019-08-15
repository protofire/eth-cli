import HelpCommand from '../../base/help-command'

export default class MethodCommand extends HelpCommand {
  static aliases = ['m']

  static description = `Allows actions with methods.`
}
