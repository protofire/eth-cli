import stripAnsi from 'strip-ansi'

import { DeployCommand } from '../../../src/commands/contract/deploy'
// const Web3 = require('web3')

describe('contract:deploy', () => {
  let stdoutResult: any

  beforeEach(() => {
    stdoutResult = []
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => stdoutResult.push(stripAnsi(val.toString())))
  })

  afterEach(() => jest.restoreAllMocks())

  it(`Should run 'contract:deploy --help' and throw an error.`, async () => {
    await expect(DeployCommand.run(['--help'])).rejects.toThrow('EEXIT: 0')
  })
})
