import NetworkIindexCommand from '../../../src/commands/network/index'

describe('network', () => {
  let stdoutResult: any

  beforeEach(() => {
    stdoutResult = []
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => stdoutResult.push(require('strip-ansi')(val.toString())))
  })

  afterEach(() => jest.restoreAllMocks())

  it(`Should run 'network' with empty args and flags and throw an error.`, async () => {
    await expect(NetworkIindexCommand.run()).rejects.toThrow()
  })

  it(`Should run 'network' and throw an error.`, async () => {
    await expect(NetworkIindexCommand.run([])).rejects.toThrow('EEXIT: 0')
  })

  it(`Should run 'network --help' and throw an error.`, async () => {
    await expect(NetworkIindexCommand.run(['--help'])).rejects.toThrow('EEXIT: 0')
  })

  it(`Should run 'network --bar' and throw an error.`, async () => {
    await expect(NetworkIindexCommand.run(['--bar'])).rejects.toThrow('EEXIT: 0')
  })
})
