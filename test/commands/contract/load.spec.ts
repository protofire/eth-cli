import ContractLoadCommand from '../../../src/commands/contract/load'

describe('contract:load', () => {
  let stdoutResult: any

  beforeEach(() => {
    stdoutResult = []
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => stdoutResult.push(require('strip-ansi')(val.toString())))
  })

  afterEach(() => jest.restoreAllMocks())

  it(`Should run 'contract:load' and throw an error.`, async () => {
    await expect(ContractLoadCommand.run([])).rejects.toThrow(
      'Missing 2 required args:\n' +
        'abi      The contract abi.\n' +
        'address  The contract address.\n' +
        'See more help with --help',
    )
  })

  it(`Should run 'contract:deploy --help' and throw an error.`, async () => {
    await expect(ContractLoadCommand.run(['--help'])).rejects.toThrow('EEXIT: 0')
  })

  it(`Should run 'contract:deploy --bar' without url and throw an error.`, async () => {
    await expect(ContractLoadCommand.run(['--bar'])).rejects.toThrow(
      'Missing 1 required arg:\n' +
        'address  The contract address.\n' +
        'See more help with --help',
    )
  })

  it(`Should run 'contract:deploy --bar' with an url and one arg and throw an error.`, async () => {
    await expect(ContractLoadCommand.run(['--ropsten', '--bar'])).rejects.toThrow(
      'Missing 1 required arg:\n' +
        'address  The contract address.\n' +
        'See more help with --help',
    )
  })

  it(`Should run 'contract:deploy --bar' with an url and two arg and throw an error.`, async () => {
    await expect(ContractLoadCommand.run(['--ropsten', '--bar', '--fo'])).rejects.toThrow(
      `ENOENT: no such file or directory, open '--bar'`,
    )
  })

  it(`Should run 'contract:deploy --bar' with an url and two arg and throw an error.`, async () => {
    await expect(ContractLoadCommand.run(['--ropsten', '--bar', '--fo'])).rejects.toThrow(
      `ENOENT: no such file or directory, open '--bar'`,
    )
  })

  it(`Should run 'contract:load ./test/files/contracts/Proxy.abi 0x601fd71f284B1933420A5DB0C43B10efC429A008' an get success.`, async () => {
    await ContractLoadCommand.run([
      './test/files/contracts/Proxy.abi',
      '0x601fd71f284B1933420A5DB0C43B10efC429A008',
    ])
    expect(stdoutResult).toMatchSnapshot()
  }, 1200000)

  it(`Should run 'contract:load ./test/files/contracts/Proxy.abi 0x601fd71f284B1933420A5DB0C43B10efC429A008' with wrong rest arg an throw an error.`, async () => {
    await expect(
      ContractLoadCommand.run([
        './test/files/contracts/Proxy.abi',
        '0x601fd71f284B1933420A5DB0C43B10efC429A008',
        `[['foo']]`,
      ]),
    ).rejects.toThrow(`eth load-contract: You must specify an address for each contract`)
  }, 60000)
})
