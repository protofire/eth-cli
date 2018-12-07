const ContractAddressCommand = require('../../../src/commands/contract/address')

describe('contract:address', () => {
  let stdoutResult

  beforeEach(() => {
    stdoutResult = []
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => stdoutResult.push(require('strip-ansi')(val.toString('utf8'))))
  })

  afterEach(() => jest.restoreAllMocks())

  it(`Should run 'contract:address' with empty args and flags and throw an error.`, async () => {
    await expect(ContractAddressCommand.run()).rejects.toThrow()
  })

  it(`Should run 'contract:address' and throw an error.`, async () => {
    await expect(ContractAddressCommand.run([])).rejects.toThrow('address is required')
  })

  it(`Should run 'contract:address --help' and throw an error.`, async () => {
    await expect(ContractAddressCommand.run(['--help'])).rejects.toThrow('EEXIT: 0')
  })

  it(`Should run 'contract:address --bar' and be get some value.`, async () => {
    await ContractAddressCommand.run(['--bar'])
    expect(stdoutResult).toMatchSnapshot()
  })

  it(`Should run 'contract:address 0x92970dbD5C0Ee6b439422bFd7cD71e1DDA921A03' and get success.`, async () => {
    await ContractAddressCommand.run(['0x92970dbD5C0Ee6b439422bFd7cD71e1DDA921A03'])
    expect(stdoutResult).toMatchSnapshot()
  })
})
