const MethodEncodeCommand = require('../../../src/commands/method/encode')

describe('encode', () => {
  let stdoutResult

  beforeEach(() => {
    stdoutResult = []
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => stdoutResult.push(require('strip-ansi')(val.toString('utf8'))))
  })

  afterEach(() => jest.restoreAllMocks())

  it(`Should run 'encode' with empty args and flags and throw an error.`, async () => {
    await expect(MethodEncodeCommand.run()).rejects.toThrow()
  })

  it(`Should run 'encode' and throw an error.`, async () => {
    await expect(MethodEncodeCommand.run([])).rejects.toThrow(
      'Missing 2 required args:\n' +
        'abi         The abi file.\n' +
        'methodCall  e.g.: \'myMethod(arg1,arg2,["a","b",3,["d","0x123..."]])\'\n' +
        'See more help with --help'
    )
  })

  it(`Should run 'encode --help' and throw an error.`, async () => {
    await expect(MethodEncodeCommand.run(['--help'])).rejects.toThrow('EEXIT: 0')
  })

  it(`Should run 'encode --abi' and throw an error.`, async () => {
    await expect(MethodEncodeCommand.run(['LOL'])).rejects.toThrow(`Missing 1 required arg:
methodCall  e.g.: 'myMethod(arg1,arg2,["a","b",3,["d","0x123..."]])'
See more help with --help`)
  })

  it(`Should run 'encode' and get success`, async () => {
    await MethodEncodeCommand.run([
      '--sokol',
      './test/files/contracts/Proxy.abi',
      'updateAppInstance()'
    ])
    expect(stdoutResult).toMatchSnapshot()
  })
})
