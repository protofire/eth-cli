const decodeCommand = require('../../src/commands/decode')

describe('decode', () => {
  let stdoutResult

  beforeEach(() => {
    stdoutResult = []
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => stdoutResult.push(require('strip-ansi')(val.toString('utf8'))))
  })

  afterEach(() => jest.restoreAllMocks())

  it(`Should run 'decode' with empty args and flags and throw an error.`, async () => {
    await expect(decodeCommand.run()).rejects.toThrow()
  })

  it(`Should run 'decode' and throw an error.`, async () => {
    await expect(decodeCommand.run([])).rejects.toThrow(
      'Missing 2 required args:\n' +
        'functionSignature  The function signature.\n' +
        'txData             The given transaction data.\n' +
        'See more help with --help'
    )
  })

  it(`Should run 'decode --help' and throw an error.`, async () => {
    await expect(decodeCommand.run(['--help'])).rejects.toThrow('EEXIT: 0')
  })

  it(`Should run 'decode --abi' and throw an error.`, async () => {
    await expect(decodeCommand.run(['LOL'])).rejects.toThrow(
      `Missing 1 required arg:
txData  The given transaction data.
See more help with --help`
    )
  })

  it(`Should run 'decode 'transfer(address,uint256)' 
  '0xa9059cbb000000000000000000000000697dB915674bAc602F4d6fAfA31c0e45f386416E00000000000000000000000000000000000000000000000000000004ff043b9e'.`, async () => {
    await decodeCommand.run([
      'transfer(address,uint256)',
      '0xa9059cbb000000000000000000000000697dB915674bAc602F4d6fAfA31c0e45f386416E00000000000000000000000000000000000000000000000000000004ff043b9e'
    ])

    expect(stdoutResult).toMatchSnapshot()
  })
})
