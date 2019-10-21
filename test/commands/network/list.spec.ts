import stripAnsi from 'strip-ansi'

import ListCommand from '../../../src/commands/network/list'

describe('network:list', () => {
  let stdoutResult: any

  beforeEach(() => {
    stdoutResult = []
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => stdoutResult.push(stripAnsi(val.toString())))
  })

  afterEach(() => jest.restoreAllMocks())

  it(`Should run 'networks --help' and throw an error.`, async () => {
    await expect(ListCommand.run(['--help'])).rejects.toThrow('EEXIT: 0')
  })

  it(`Should run 'networks' and match snapshot.`, async () => {
    await ListCommand.run([])
    expect(stdoutResult).toMatchSnapshot()
  })

  it(`Should run 'networks --json' and match snapshot.`, async () => {
    await ListCommand.run(['--json'])
    expect(stdoutResult).toMatchSnapshot()
  })

  it(`Should run 'networks --table' and match snapshot.`, async () => {
    await ListCommand.run(['--table'])
    expect(stdoutResult).toMatchSnapshot()
  })

  it(`Should run 'network:urls --bar' and throw an error.`, async () => {
    await expect(ListCommand.run(['--bar'])).rejects.toThrow('Unexpected argument: --bar')
  })
})
