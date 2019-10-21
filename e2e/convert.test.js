const getStream = require('get-stream')
const path = require('path')
const shell = require('shelljs')

const binPath = path.join(__dirname, '..', 'bin', 'run')
const eth = (args, options = {}) => shell.exec(`${binPath} ${args}`, { ...options, silent: true })

describe('convert', () => {
  it('should convert from wei to ether by default', async () => {
    const result = eth('convert 1000000000000000000')
    expect(result.code).toEqual(0)
    expect(result.stdout.trim()).toEqual('1')
  })
  it('should convert from ether to wei', async () => {
    const result = eth('convert --from eth --to wei 1')
    expect(result.code).toEqual(0)
    expect(result.stdout.trim()).toEqual('1000000000000000000')
  })
  it('should convert from gwei to wei', async () => {
    const result = eth('convert --from gwei --to wei 5')
    expect(result.code).toEqual(0)
    expect(result.stdout.trim()).toEqual('5000000000')
  })
  it('should accept shorthand flags', async () => {
    const result = eth('convert -f gwei -t wei 5')
    expect(result.code).toEqual(0)
    expect(result.stdout.trim()).toEqual('5000000000')
  })
  it('should read from stdin if no amount is specified', async () => {
    const child = eth('convert', { async: true })
    const stdout = getStream(child.stdout)
    child.stdin.write('1000000000000000000')
    child.stdin.end()

    const result = (await stdout).trim()

    expect(result).toEqual('1')
  })
})
