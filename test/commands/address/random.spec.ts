import { RandomCommand } from '../../../src/commands/address/random'

describe('address:random', () => {
  let stdoutResult: any

  beforeEach(() => {
    stdoutResult = []
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => stdoutResult.push(require('strip-ansi')(val.toString())))
  })

  afterEach(() => jest.restoreAllMocks())

  it(`Should run 'randomAddress' and success.`, async () => {
    await RandomCommand.run([])
    expect(stdoutResult[0]).toMatch(/address/)
    expect(stdoutResult[0]).toMatch(/privateKey/)
    expect(stdoutResult.length).toBe(1)
  })

  it(`Should run 'randomAddress 10' and success.`, async () => {
    await RandomCommand.run(['10'])

    expect(stdoutResult.length).toBe(10)
  })

  it(`Should run 'randomAddress 2 1' and success.`, async () => {
    await RandomCommand.run(['2', '--prefix', '1'])

    expect(stdoutResult.length).toBe(2)
    expect(stdoutResult[0]).toMatch(/0x1/)
  }, 60000)
})
