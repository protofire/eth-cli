import NetworkIdsCommand from '../../../src/commands/network/ids'

describe('network:ids', () => {
  let stdoutResult: any

  beforeEach(() => {
    stdoutResult = []
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => stdoutResult.push(require('strip-ansi')(val.toString())))
  })

  afterEach(() => jest.restoreAllMocks())

  it(`Should run 'network:ids --help' and throw an error.`, async () => {
    await expect(NetworkIdsCommand.run(['--help'])).rejects.toThrow('EEXIT: 0')
  })

  it(`Should run 'network:ids' and match snapshot.`, async () => {
    await NetworkIdsCommand.run([])
    expect(stdoutResult).toMatchSnapshot()
  })

  it(`Should run 'network:ids --display=json' and match snapshot.`, async () => {
    await NetworkIdsCommand.run(['--display=json'])
    expect(stdoutResult).toMatchSnapshot()
  })

  it(`Should run 'network:ids --display=table' and match snapshot.`, async () => {
    await NetworkIdsCommand.run(['--display=table'])
    expect(stdoutResult).toMatchSnapshot()
  })

  it(`Should run 'network:ids --bar' and throw an error.`, async () => {
    await expect(NetworkIdsCommand.run(['--bar'])).rejects.toThrow('Unexpected argument: --bar')
  })
})
