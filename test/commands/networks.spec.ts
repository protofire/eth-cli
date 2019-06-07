import NetworksCommand from '../../src/commands/networks'

describe('networks', () => {
  let stdoutResult: any

  beforeEach(() => {
    stdoutResult = []
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => stdoutResult.push(require('strip-ansi')(val.toString())))
  })

  afterEach(() => jest.restoreAllMocks())

  it(`Should run 'networks --help' and throw an error.`, async () => {
    await expect(NetworksCommand.run(['--help'])).rejects.toThrow('EEXIT: 0')
  })

  it(`Should run 'networks' and match snapshot.`, async () => {
    await NetworksCommand.run([])
    expect(stdoutResult).toMatchSnapshot()
  })

  it(`Should run 'networks --json' and match snapshot.`, async () => {
    await NetworksCommand.run(['--json'])
    expect(stdoutResult).toMatchSnapshot()
  })

  it(`Should run 'networks --table' and match snapshot.`, async () => {
    await NetworksCommand.run(['--table'])
    expect(stdoutResult).toMatchSnapshot()
  })

  it(`Should run 'network:urls --bar' and throw an error.`, async () => {
    await expect(NetworksCommand.run(['--bar'])).rejects.toThrow('Unexpected argument: --bar')
  })
})
