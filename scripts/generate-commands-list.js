const fs = require('fs')
const path = require('path')

if (!process.argv[2]) {
  console.error('usage: node generate-commands-list.js path/to/file.md')
  process.exit(1)
}

const commandsDocPath = path.join(process.cwd(), process.argv[2])
const commandsDocStream = fs.createWriteStream(commandsDocPath)

const write = s => commandsDocStream.write(s + '\n')

const commandsDir = path.join(__dirname, '..', 'lib', 'commands')

const files = fs.readdirSync(commandsDir).map(file => path.join(commandsDir, file))

write('')
write('')

const commandPaths = files.filter(file => path.extname(file) !== '.ts')

for (const commandPath of commandPaths) {
  const commandName = path.basename(commandPath).replace('.js', '')
  write(`## \`${commandName}\``)
  write('')
  const command = Object.entries(require(commandPath))[0][1]
  write(command.description)
  write('')

  const isTopLevel = fs.statSync(commandPath).isFile()
  if (isTopLevel) {
    if (command.examples && command.examples.length) {
      write('Examples:')
      for (const example of command.examples || []) {
        write(`- \`${example}\``)
      }
      write('')
    }
  } else {
    const subcommandPaths = fs.readdirSync(commandPath).filter(file => path.extname(file) !== '.ts').filter(file => path.basename(file) !== 'index.js')
      .map(file => path.join(commandPath, file))

    for (const subcommandPath of subcommandPaths) {
      const subcommandName = path.basename(subcommandPath).replace('.js', '')
      write(`### \`${commandName}:${subcommandName}\``)
      write('')
      const subcommand = Object.entries(require(subcommandPath))[0][1]
      write(subcommand.description)
      write('')
    if (subcommand.examples && subcommand.examples.length) {
      write('Examples:')
      for (const example of subcommand.examples || []) {
        write(`- \`${example}\``)
      }
      write('')
    }
    }
  }
}
