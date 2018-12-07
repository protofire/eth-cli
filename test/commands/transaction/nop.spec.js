const TransactionNopCommand = require('../../../src/commands/transaction/nop')

describe('transaction:nop', () => {
  let stdoutResult

  beforeEach(() => {
    stdoutResult = []
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => stdoutResult.push(require('strip-ansi')(val.toString('utf8'))))
  })

  afterEach(() => jest.restoreAllMocks())

  it(`Should run 'transaction:nop' with empty args and flags and throw an error.`, async () => {
    await expect(TransactionNopCommand.run()).rejects.toThrow()
  })

  it(`Should run 'transaction:nop' and throw an error.`, async () => {
    await expect(TransactionNopCommand.run([])).rejects.toThrow(
      'Missing 1 required arg:\n' + 'pk  The private key.\n' + 'See more help with --help'
    )
  })

  it(`Should run 'transaction:nop --help' and throw an error.`, async () => {
    await expect(TransactionNopCommand.run(['--help'])).rejects.toThrow('EEXIT: 0')
  })

  it(`Should run 'transaction:nop --bar' without url and throw an error.`, async () => {
    await expect(TransactionNopCommand.run(['--bar'])).rejects.toThrow(
      `Cannot read property 'fromRed' of null`
    )
  })

  it(`Should run 'transaction:nop --bar' and throw an error.`, async () => {
    await expect(TransactionNopCommand.run(['--ropsten', '--bar'])).rejects.toThrow(
      `Cannot read property 'fromRed' of null`
    )
  })

  it(`Should run 'transaction:nop --ropsten 4de542b9901b9005a8dc18e3f959e35736c9479148f5b9079e7d9a201ae04739' and match regex.`, async () => {
    await TransactionNopCommand.run([
      '--sokol',
      'ce842fe873ffe6f0a401e9d2a0a43ce1bf03693a97af6440203ae4a3db2d2d31'
    ])
    expect(JSON.parse(stdoutResult)).toMatch(/[0-9A-Fa-f]{6}/g)
  }, 160000)
})
