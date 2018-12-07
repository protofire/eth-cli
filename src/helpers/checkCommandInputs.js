// Checks for args or flags supplied to command
const isEmptyCommand = (flags, args) => {
  if (!hasFlags(flags) && !hasArgs(args)) {
    return true
  }
  return false
}

const hasFlags = flags => {
  return Object.keys(flags).length
}

const hasArgs = args => {
  return Object.keys(args).length
}

module.exports = {
  hasFlags: hasFlags,
  hasArgs: hasArgs,
  isEmptyCommand: isEmptyCommand
}
