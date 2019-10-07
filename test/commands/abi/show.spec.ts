import ShowCommand from '../../../src/commands/abi/show'
import erc20Abi from '../../../src/helpers/abi/erc20.json'
import erc721Abi from '../../../src/helpers/abi/erc721.json'

describe('abi:show', () => {
  let stdoutResult: any

  beforeEach(() => {
    stdoutResult = []
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => stdoutResult.push(require('strip-ansi')(val.toString())))
  })

  afterEach(() => jest.restoreAllMocks())

  it(`Should run 'abi:show --help' and throw an error.`, async () => {
    await expect(ShowCommand.run(['--help'])).rejects.toThrow('EEXIT: 0')
  })

  it(`Should run 'abi:show ERC20' and receive the ERC20 abi.`, async () => {
    await ShowCommand.run(['erc20'])
    const result = JSON.parse(stdoutResult[0])
    expect(result).toMatchObject(erc20Abi)
  })

  it(`Should run 'abi:show ERC721' and receive the ERC721 abi.`, async () => {
    await ShowCommand.run(['erc721'])
    const result = JSON.parse(stdoutResult[0])
    expect(result).toMatchObject(erc721Abi)
  })
})
