import { RandomAddressCommand } from '../../src/commands/randomAddress'

describe('randomAddress', () => {
  let stdoutResult: any

  beforeEach(() => {
    stdoutResult = []
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => stdoutResult.push(require('strip-ansi')(val.toString())))
  })

  afterEach(() => jest.restoreAllMocks())

  it(`Should run 'randomAddress' and success.`, async () => {
    await RandomAddressCommand.run([])
    expect(stdoutResult[0]).toMatch(/address/)
    expect(stdoutResult[0]).toMatch(/privateKey/)
    expect(stdoutResult.length).toBe(1)
  })

  it(`Should run 'randomAddress 10' and success.`, async () => {
    await RandomAddressCommand.run(['10'])

    expect(stdoutResult.length).toBe(10)
  })

  it(`Should run 'randomAddress 2 1' and success.`, async () => {
    await RandomAddressCommand.run(['2', '1'])

    expect(stdoutResult.length).toBe(2)
    expect(stdoutResult[0]).toMatch(/0x1/)
  }, 60000)

  it(`Should run 'randomAddress l' and throw an error.`, async () => {
    await expect(RandomAddressCommand.run(['l'])).rejects.toThrow(
      '[random-address] amount must be an integer number and greater than 0'
    )
  })

  it(`Should run 'randomAddress l 1' and throw an error.`, async () => {
    await expect(RandomAddressCommand.run(['l', '1'])).rejects.toThrow(
      '[random-address] amount must be an integer number and greater than 0'
    )
  })

  it(`Should run 'randomAddress 1 Z' and throw an error.`, async () => {
    await expect(RandomAddressCommand.run(['1', 'Z'])).rejects.toThrow(
      '[random-address] prefix must be a valid hex value'
    )
  })

  it(`Should run 'randomAddress --bar' and throw an error.`, async () => {
    await expect(RandomAddressCommand.run(['--bar'])).rejects.toThrow(
      '[random-address] amount must be an integer number and greater than 0'
    )
  })
})
