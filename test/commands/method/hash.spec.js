const MethodHashCommand = require('../../../src/commands/method/hash')

describe('hash', () => {
  let stdoutResult

  beforeEach(() => {
    stdoutResult = []
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => stdoutResult.push(require('strip-ansi')(val.toString('utf8'))))
  })

  afterEach(() => jest.restoreAllMocks())

  it(`Should run 'hash' with empty args and flags and throw an error.`, async () => {
    await expect(MethodHashCommand.run()).rejects.toThrow()
  })

  it(`Should run 'hash' and throw an error.`, async () => {
    await expect(MethodHashCommand.run([])).rejects.toThrow(
      'Missing 1 required arg:\n' +
        'signature  The given signature.\n' +
        'See more help with --help'
    )
  })

  it(`Should run 'hash --help' and throw an error.`, async () => {
    await expect(MethodHashCommand.run(['--help'])).rejects.toThrow('EEXIT: 0')
  })

  it(`Should run 'hash -- 'updateAppInstance'' and get success`, async () => {
    await MethodHashCommand.run(['updateAppInstance'])
    expect(stdoutResult).toMatchSnapshot()
  })
})
