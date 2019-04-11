// Checks for args or flags supplied to command
export const isEmptyCommand = (flags: any, args: any) => {
  if (!hasFlags(flags) && !hasArgs(args)) {
    return true
  }
  return false
}

export const hasFlags = (flags: any) => {
  return Object.keys(flags).length
}

export const hasArgs = (args: any) => {
  return Object.keys(args).length
}
