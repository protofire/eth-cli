import { DeployCommand } from '../../../src/commands/contract/deploy'
// const Web3 = require('web3')

describe('contract:deploy', () => {
  let stdoutResult: any

  beforeEach(() => {
    stdoutResult = []
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => stdoutResult.push(require('strip-ansi')(val.toString())))
  })

  afterEach(() => jest.restoreAllMocks())

  it(`Should run 'contract:deploy' and throw an error.`, async () => {
    await expect(DeployCommand.run([])).rejects.toThrow(
      'Missing 1 required arg:\n' +
        'bin  The bin file of the contract.\n' +
        'See more help with --help',
    )
  })

  it(`Should run 'contract:deploy --help' and throw an error.`, async () => {
    await expect(DeployCommand.run(['--help'])).rejects.toThrow('EEXIT: 0')
  })
})
