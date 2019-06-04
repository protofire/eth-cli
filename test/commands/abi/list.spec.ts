import ListCommand from '../../../src/commands/abi/list'
import { getAbiList } from '../../../src/helpers/knownAbis'

describe('abi:list', () => {
  let stdoutResult: any

  beforeEach(() => {
    stdoutResult = []
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => stdoutResult.push(require('strip-ansi')(val.toString())))
  })

  afterEach(() => jest.restoreAllMocks())

  it(`Should run 'abi:list' and display the list of available abis.`, async () => {
    await ListCommand.run([])
    const abiList = getAbiList()
    const listFormated = abiList.join().replace(',', '\n');
    await expect(stdoutResult[0]).toContain(listFormated)
  })

  it(`Should run 'abi:list --help' and throw an error.`, async () => {
    await expect(ListCommand.run(['--help'])).rejects.toThrow('EEXIT: 0')
  })
})
