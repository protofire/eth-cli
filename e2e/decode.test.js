const path = require('path')
const shell = require('shelljs')

const binPath = path.join(__dirname, '..', 'bin', 'run')

describe('decode', () => {
  it('decode a transfer transaction', async () => {
    const signature = 'transfer(address,uint256)'
    const data = '0xa9059cbb000000000000000000000000697dB915674bAc602F4d6fAfA31c0e45f386416E00000000000000000000000000000000000000000000000000000004ff043b9e'
    const result = shell.exec(`${binPath} decode '${signature}' '${data}'`, { silent: true })

    expect(result.code).toEqual(0)

    const output = JSON.parse(result.stdout)

    expect(output).toHaveLength(2)
    expect(output[0]).toEqual('0x697dB915674bAc602F4d6fAfA31c0e45f386416E')
  })
})
