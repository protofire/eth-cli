import TransactionNopCommand from '../../../src/commands/transaction/nop'

describe('transaction:nop', () => {
  let stdoutResult: any

  beforeEach(() => {
    stdoutResult = []
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => stdoutResult.push(require('strip-ansi')(val.toString())))
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
})
