import stripAnsi from 'strip-ansi'

import MethodEncodeCommand from '../../../src/commands/method/encode'

describe('encode', () => {
  let stdoutResult: any

  beforeEach(() => {
    stdoutResult = []
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => stdoutResult.push(stripAnsi(val.toString())))
  })

  afterEach(() => jest.restoreAllMocks())

  it(`Should run 'encode' with empty args and flags and throw an error.`, async () => {
    await expect(MethodEncodeCommand.run()).rejects.toThrow()
  })

  it(`Should run 'encode --help' and throw an error.`, async () => {
    await expect(MethodEncodeCommand.run(['--help'])).rejects.toThrow('EEXIT: 0')
  })

  it(`Should run 'encode' and get success`, async () => {
    await MethodEncodeCommand.run(['./test/files/contracts/Proxy.abi', 'updateAppInstance()'])
    expect(stdoutResult).toMatchSnapshot()
  })
})
