import TransactionGetCommand from '../../../src/commands/transaction/get'

describe('transaction:get', () => {
  let stdoutResult: any

  beforeEach(() => {
    stdoutResult = []
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => stdoutResult.push(require('strip-ansi')(val.toString())))
  })

  afterEach(() => jest.restoreAllMocks())

  it(`Should run 'transaction:get' with empty args and flags and throw an error.`, async () => {
    await expect(TransactionGetCommand.run()).rejects.toThrow()
  })

  it(`Should run 'transaction:get' and throw an error.`, async () => {
    await expect(TransactionGetCommand.run([])).rejects.toThrow(
      'Missing 1 required arg:\n' + 'txHash  The transaction hash.\n' + 'See more help with --help',
    )
  })

  it(`Should run 'transaction:get --help' and throw an error.`, async () => {
    await expect(TransactionGetCommand.run(['--help'])).rejects.toThrow('EEXIT: 0')
  })

  it(`Should run 'transaction:get --bar' and throw an error.`, async () => {
    await expect(TransactionGetCommand.run(['--ropsten', '--bar'])).rejects.toThrow()
  })

  it(`Should run 'transaction:get --ropsten 0xc83836f1b3acac94a31de8e24c913aceaa9ebc51c93cd374429590596091584a' and match snapshot.`, async () => {
    await TransactionGetCommand.run([
      '--ropsten',
      '0xc83836f1b3acac94a31de8e24c913aceaa9ebc51c93cd374429590596091584a',
    ])
    expect(stdoutResult).toMatchSnapshot()
  })

  it(`Should run 'transaction:get --ropsten 83836f1b3acac94a31de8e24c913aceaa9ebc51c93cd374429590596091584a' and match snapshot.`, async () => {
    await expect(
      TransactionGetCommand.run([
        '--ropsten',
        '83836f1b3acac94a31de8e24c913aceaa9ebc51c93cd374429590596091584a',
      ]),
    ).rejects.toThrow()
  })
})
