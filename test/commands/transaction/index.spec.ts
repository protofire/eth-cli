import stripAnsi from 'strip-ansi'

import TransactionindexCommand from '../../../src/commands/transaction/index'

describe('transaction', () => {
  let stdoutResult: any

  beforeEach(() => {
    stdoutResult = []
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => stdoutResult.push(stripAnsi(val.toString())))
  })

  afterEach(() => jest.restoreAllMocks())

  it(`Should run 'transaction' with empty args and flags and throw an error.`, async () => {
    await expect(TransactionindexCommand.run()).rejects.toThrow()
  })

  it(`Should run 'transaction' and throw an error.`, async () => {
    await expect(TransactionindexCommand.run([])).rejects.toThrow('EEXIT: 0')
  })

  it(`Should run 'transaction --help' and throw an error.`, async () => {
    await expect(TransactionindexCommand.run(['--help'])).rejects.toThrow('EEXIT: 0')
  })

  it(`Should run 'transaction --bar' and throw an error.`, async () => {
    await expect(TransactionindexCommand.run(['--bar'])).rejects.toThrow(
      'Unexpected argument: --bar',
    )
  })
})
