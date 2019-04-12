import AddressCommand from '../../../src/commands/contract/address'

describe('contract:address', () => {
  let stdoutResult: any

  beforeEach(() => {
    stdoutResult = []
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => stdoutResult.push(require('strip-ansi')(val.toString())))
  })

  afterEach(() => jest.restoreAllMocks())

  it(`Should run 'contract:address' with empty args and flags and throw an error.`, async () => {
    await expect(AddressCommand.run()).rejects.toThrow()
  })

  it(`Should run 'contract:address' and throw an error.`, async () => {
    await expect(AddressCommand.run([])).rejects.toThrow()
  })

  it(`Should run 'contract:address --help' and throw an error.`, async () => {
    await expect(AddressCommand.run(['--help'])).rejects.toThrow('EEXIT: 0')
  })

  it(`Should run 'contract:address --bar' and be get some value.`, async () => {
    await AddressCommand.run(['--bar'])
    expect(stdoutResult).toMatchSnapshot()
  })

  it(`Should run 'contract:address 0x92970dbD5C0Ee6b439422bFd7cD71e1DDA921A03' and get success.`, async () => {
    await AddressCommand.run(['0x92970dbD5C0Ee6b439422bFd7cD71e1DDA921A03'])
    expect(stdoutResult).toMatchSnapshot()
  })
})
