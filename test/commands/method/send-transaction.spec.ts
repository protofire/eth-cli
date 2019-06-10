import MethodSendTransactionCommand from '../../../src/commands/method/send-transaction'

describe('send-transaction', () => {
  let stdoutResult: any

  beforeEach(() => {
    stdoutResult = []
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => stdoutResult.push(require('strip-ansi')(val.toString())))
  })

  afterEach(() => jest.restoreAllMocks())

  it(`Should run 'send-transaction' with empty args and flags and throw an error.`, async () => {
    await expect(MethodSendTransactionCommand.run()).rejects.toThrow()
  })

  it(`Should run 'send-transacion' and throw an error.`, async () => {
    await expect(MethodSendTransactionCommand.run([])).rejects.toThrow(
      'Missing 2 required args:\n' +
        'encodedABI  The encoded ABI.\n' +
        "address     The contract's address.\n" +
        'See more help with --help',
    )
  })

  it(`Should run 'send-transaction --help' and throw an error.`, async () => {
    await expect(MethodSendTransactionCommand.run(['--help'])).rejects.toThrow('EEXIT: 0')
  })
})
