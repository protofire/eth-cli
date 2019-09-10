import DecodeCommand from '../../../src/commands/method/decode'

describe('decode', () => {
  let stdoutResult: any

  beforeEach(() => {
    stdoutResult = []
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => stdoutResult.push(require('strip-ansi')(val.toString())))
  })

  afterEach(() => jest.restoreAllMocks())

  it(`Should run 'decode' with empty args and flags and throw an error.`, async () => {
    await expect(DecodeCommand.run()).rejects.toThrow()
  })

  it(`Should run 'decode --help' and throw an error.`, async () => {
    await expect(DecodeCommand.run(['--help'])).rejects.toThrow('EEXIT: 0')
  })

  it(`Should run 'decode 'transfer(address,uint256)'
  '0xa9059cbb000000000000000000000000697dB915674bAc602F4d6fAfA31c0e45f386416E00000000000000000000000000000000000000000000000000000004ff043b9e'.`, async () => {
    await DecodeCommand.run([
      'transfer(address,uint256)',
      '0xa9059cbb000000000000000000000000697dB915674bAc602F4d6fAfA31c0e45f386416E00000000000000000000000000000000000000000000000000000004ff043b9e',
    ])

    expect(stdoutResult).toMatchSnapshot()
  })
})
