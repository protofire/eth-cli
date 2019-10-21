import stripAnsi from 'strip-ansi'

import TransactionNopCommand from '../../../src/commands/transaction/nop'

describe('transaction:nop', () => {
  let stdoutResult: any

  beforeEach(() => {
    stdoutResult = []
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => stdoutResult.push(stripAnsi(val.toString())))
  })

  afterEach(() => jest.restoreAllMocks())

  it(`Should run 'transaction:nop' with empty args and flags and throw an error.`, async () => {
    await expect(TransactionNopCommand.run()).rejects.toThrow()
  })

  it(`Should run 'transaction:nop --help' and throw an error.`, async () => {
    await expect(TransactionNopCommand.run(['--help'])).rejects.toThrow('EEXIT: 0')
  })
})
