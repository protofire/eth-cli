import MethodsCommand from '../../src/commands/methods'

describe('methods', () => {
  let stdoutResult: any

  beforeEach(() => {
    stdoutResult = []
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => stdoutResult.push(require('strip-ansi')(val.toString())))
  })

  afterEach(() => jest.restoreAllMocks())

  it(`Should run 'methods' with empty args and flags and throw an error.`, async () => {
    await expect(MethodsCommand.run()).rejects.toThrow()
  })

  it(`Should run 'methods' and throw an error.`, async () => {
    await expect(MethodsCommand.run([])).rejects.toThrow(
      'Missing 1 required arg:\n' + 'abi  Contract ABI.\n' + 'See more help with --help',
    )
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
