import AbiCommand from '../../src/commands/abi'
import erc20Abi from '../../src/helpers/abi/erc20.json'
import erc721Abi from '../../src/helpers/abi/erc721.json'
describe('abi', () => {
  let stdoutResult: any

  beforeEach(() => {
    stdoutResult = []
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => stdoutResult.push(require('strip-ansi')(val.toString())))
  })

  afterEach(() => jest.restoreAllMocks())

  it(`Should run 'abi' and throw an error.`, async () => {
    await expect(AbiCommand.run([])).rejects.toThrow(
      'Missing 1 required arg:\n' + 'abi  The contract abi name.\n' + 'See more help with --help',
    )
  })

  it(`Should run 'abi --help' and throw an error.`, async () => {
    await expect(AbiCommand.run(['--help'])).rejects.toThrow('EEXIT: 0')
  })

  it(`Should run 'abi ERC20' and receive the ERC20 abi.`, async () => {
    await AbiCommand.run(['ERC20'])
    const resultExpected = JSON.stringify(erc20Abi)
    expect(stdoutResult[0]).toContain(resultExpected)
  })

  it(`Should run 'abi ERC721' and receive the ERC721 abi.`, async () => {
    await AbiCommand.run(['ERC721'])
    const resultExpected = JSON.stringify(erc721Abi)
    expect(stdoutResult[0]).toContain(resultExpected)
  })
})
