import ReplCommand from '../../src/commands/repl'

describe('replCommand', () => {
  let stdoutResult: any

  beforeEach(() => {
    stdoutResult = []
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => stdoutResult.push(require('strip-ansi')(val.toString())))
  })

  afterEach(() => jest.restoreAllMocks())

  it(`Should run 'repl' with empty args and flags and throw an error.`, async () => {
    await ReplCommand.run([])
    expect(stdoutResult).toMatchSnapshot()
  })

  it(`Should run 'repl --help' and throw an error.`, async () => {
    await expect(ReplCommand.run(['--help'])).rejects.toThrow('EEXIT: 0')
  })
})
