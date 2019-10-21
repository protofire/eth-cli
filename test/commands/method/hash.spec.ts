import stripAnsi from 'strip-ansi'

import MethodHashCommand from '../../../src/commands/method/hash'

describe('hash', () => {
  let stdoutResult: any

  beforeEach(() => {
    stdoutResult = []
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => stdoutResult.push(stripAnsi(val.toString())))
  })

  afterEach(() => jest.restoreAllMocks())

  it(`Should run 'hash' with empty args and flags and throw an error.`, async () => {
    await expect(MethodHashCommand.run()).rejects.toThrow()
  })

  it(`Should run 'hash --help' and throw an error.`, async () => {
    await expect(MethodHashCommand.run(['--help'])).rejects.toThrow('EEXIT: 0')
  })

  it(`Should run 'hash -- 'updateAppInstance'' and get success`, async () => {
    await MethodHashCommand.run(['updateAppInstance'])
    expect(stdoutResult).toMatchSnapshot()
  })
})
