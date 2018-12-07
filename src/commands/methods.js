const { Command } = require('@oclif/command')
const getMethods = require('../helpers/getMethods')

class MethodsCommand extends Command {
  async run() {
    const { args } = this.parse(MethodsCommand)

    try {
      const { abi } = args

      const methods = getMethods(abi)

      methods.forEach(({ signature, signatureHash }) => {
        this.log(`${signatureHash}\t${signature}`)
      })
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}

MethodsCommand.aliases = ['me']

MethodsCommand.description = `Get the hash of each method in the given ABI.`

MethodsCommand.args = [
  {
    name: 'abi',
    required: true,
    description: 'Contract ABI.'
  }
]

MethodsCommand.examples = ['eth methods ../contracts/proxy.abi']

module.exports = MethodsCommand
