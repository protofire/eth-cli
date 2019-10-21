import stripAnsi from 'strip-ansi'

import MethodsCommand from '../../../src/commands/abi/methods'

describe('methods', () => {
  let stdoutResult: any

  beforeEach(() => {
    stdoutResult = []
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => stdoutResult.push(stripAnsi(val.toString())))
  })

  afterEach(() => jest.restoreAllMocks())

  it(`Should run 'methods' with empty args and flags and throw an error.`, async () => {
    await expect(MethodsCommand.run()).rejects.toThrow()
  })

  it(`Should run 'methods --help' and throw an error.`, async () => {
    await expect(MethodsCommand.run(['--help'])).rejects.toThrow('EEXIT: 0')
  })

  it(`Should run 'methods --abi' and throw an error.`, async () => {
    await expect(MethodsCommand.run(['LOL'])).rejects.toThrow(
      `ENOENT: no such file or directory, open 'LOL'`,
    )
  })

  it(`Should run 'methods ./test/files/contracts/Proxy.abi' and success.`, async () => {
    await MethodsCommand.run(['./test/files/contracts/Proxy.abi'])

    expect(stdoutResult).toMatchSnapshot()
  })
})
