const ContractDeployCommand = require('../../../src/commands/contract/deploy')
// const Web3 = require('web3')

describe('contract:deploy', () => {
  let stdoutResult

  beforeEach(() => {
    stdoutResult = []
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => stdoutResult.push(require('strip-ansi')(val.toString('utf8'))))
  })

  afterEach(() => jest.restoreAllMocks())

  it(`Should run 'contract:deploy' and throw an error.`, async () => {
    await expect(ContractDeployCommand.run([])).rejects.toThrow(
      'Missing 2 required args:\n' +
        'pk   The private key.\n' +
        'bin  The bin file of the contract.\n' +
        'See more help with --help'
    )
  })

  it(`Should run 'contract:deploy --help' and throw an error.`, async () => {
    await expect(ContractDeployCommand.run(['--help'])).rejects.toThrow('EEXIT: 0')
  })

  it(`Should run 'contract:deploy --bar' without url and throw an error.`, async () => {
    await expect(ContractDeployCommand.run(['--bar'])).rejects.toThrow(
      'Missing 1 required arg:\n' +
        'bin  The bin file of the contract.\n' +
        'See more help with --help'
    )
  })

  it(`Should run 'contract:deploy --bar' with an url and one arg and throw an error.`, async () => {
    await expect(ContractDeployCommand.run(['--ropsten', '--bar'])).rejects.toThrow(
      'Missing 1 required arg:\n' +
        'bin  The bin file of the contract.\n' +
        'See more help with --help'
    )
  })

  it(`Should run 'contract:deploy --bar' with an url and two arg and throw an error.`, async () => {
    await expect(ContractDeployCommand.run(['--ropsten', '--bar', '--fo'])).rejects.toThrow(
      `Cannot read property 'fromRed' of null`
    )
  })

  // it(`Should run 'contract:deploy --sokol ce842fe873ffe6f0a401e9d2a0a43ce1bf03693a97af6440203ae4a3db2d2d31 ./test/files/contracts/Proxy.bin' an get success.`, async () => {
  //   await ContractDeployCommand.run([
  //     '--sokol',
  //     'ce842fe873ffe6f0a401e9d2a0a43ce1bf03693a97af6440203ae4a3db2d2d31',
  //     './test/files/contracts/Proxy.bin'
  //   ])
  //   const stdoutResultParsed = JSON.parse(stdoutResult)
  //   const isAddress = Web3.utils.isAddress(stdoutResultParsed.address)
  //   expect(isAddress).toBeTruthy()
  //   expect(typeof stdoutResultParsed.receipt).toBe('object')
  // }, 1200000)
})
