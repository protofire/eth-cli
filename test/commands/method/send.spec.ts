import MethodSendCommand from '../../../src/commands/method/send'

describe('send', () => {
  let stdoutResult: any

  beforeEach(() => {
    stdoutResult = []
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => stdoutResult.push(require('strip-ansi')(val.toString())))
  })

  afterEach(() => jest.restoreAllMocks())

  it(`Should run 'send' with empty args and flags and throw an error.`, async () => {
    await expect(MethodSendCommand.run()).rejects.toThrow()
  })

  it(`Should run 'send' and throw an error.`, async () => {
    await expect(MethodSendCommand.run([])).rejects.toThrow(
      'Missing 4 required args:\n' +
        "abi         The contract's ABI.\n" +
        'methodCall  e.g.: \'myMethod(arg1,arg2,["a","b",3,["d","0x123..."]])\'\n' +
        "address     The contract's  address.\n" +
        'pk          The private key.\n' +
        'See more help with --help',
    )
  })

  it(`Should run 'send --help' and throw an error.`, async () => {
    await expect(MethodSendCommand.run(['--help'])).rejects.toThrow('EEXIT: 0')
  })
})
