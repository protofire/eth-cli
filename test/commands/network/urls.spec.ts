import NetworkUrlsCommand from '../../../src/commands/network/urls'

describe('networl:urls', () => {
  let stdoutResult: any

  beforeEach(() => {
    stdoutResult = []
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => stdoutResult.push(require('strip-ansi')(val.toString())))
  })

  afterEach(() => jest.restoreAllMocks())

  it(`Should run 'network:urls --help' and throw an error.`, async () => {
    await expect(NetworkUrlsCommand.run(['--help'])).rejects.toThrow('EEXIT: 0')
  })

  it(`Should run 'network:urls' and match snapshot.`, async () => {
    await NetworkUrlsCommand.run([])
    expect(stdoutResult).toMatchSnapshot()
  })

  it(`Should run 'network:urls -display=json' and match snapshot.`, async () => {
    await NetworkUrlsCommand.run(['--display=json'])
    expect(stdoutResult).toMatchSnapshot()
  })

  it(`Should run 'network:urls -display=table' and match snapshot.`, async () => {
    await NetworkUrlsCommand.run(['--display=table'])
    expect(stdoutResult).toMatchSnapshot()
  })

  it(`Should run 'network:urls --bar' and throw an error.`, async () => {
    await expect(NetworkUrlsCommand.run(['--bar'])).rejects.toThrow('Unexpected argument: --bar')
  })
})
