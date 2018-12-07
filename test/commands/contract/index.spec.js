const ContractIndexCommand = require('../../../src/commands/contract/index')

describe('contract', () => {
  let stdoutResult

  beforeEach(() => {
    stdoutResult = []
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => stdoutResult.push(require('strip-ansi')(val.toString('utf8'))))
  })

  afterEach(() => jest.restoreAllMocks())

  it(`Should run 'contract' with empty args and flags and throw an error.`, async () => {
    await expect(ContractIndexCommand.run()).rejects.toThrow()
  })

  it(`Should run 'contract' and throw an error.`, async () => {
    await expect(ContractIndexCommand.run([])).rejects.toThrow('EEXIT: 0')
  })

  it(`Should run 'contract --help' and throw an error.`, async () => {
    await expect(ContractIndexCommand.run(['--help'])).rejects.toThrow('EEXIT: 0')
  })

  it(`Should run 'contract --bar' and throw an error.`, async () => {
    await expect(ContractIndexCommand.run(['--bar'])).rejects.toThrow(
      'Unexpected argument: --bar\n' + 'See more help with --help'
    )
  })
})
