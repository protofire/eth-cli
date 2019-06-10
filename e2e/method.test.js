const path = require('path')
const shell = require('shelljs')

const binPath = path.join(__dirname, '..', 'bin', 'run')
const testAbis = path.join(__dirname, 'abis')

const erc20Abi = path.join(testAbis, 'ERC20.json')

describe('method', () => {
  describe('hash', () => {
    it('should return the hash of the transfer signature', async () => {
      const signature = 'transfer(address,uint256)'
      const result = shell.exec(`${binPath} method:hash '${signature}'`, { silent: true })

      expect(result.code).toEqual(0)

      expect(result.stdout.trim()).toEqual('a9059cbb')
    })
  })

  describe('encode', () => {
    it('should encode the totalSupply method', () => {
      const signature = 'totalSupply()'
      const result = shell.exec(`${binPath} method:encode '${erc20Abi}' '${signature}'`, {
        silent: true,
      })

      expect(result.code).toEqual(0)

      expect(result.stdout.trim()).toEqual('0x18160ddd')
    })

    it('should encode the balanceOf method', () => {
      const signature = 'balanceOf("0xacA5Bfc4beb54f3A8608e22F67e66594F532e8Aa")'
      const result = shell.exec(`${binPath} method:encode '${erc20Abi}' '${signature}'`, {
        silent: true,
      })

      expect(result.code).toEqual(0)

      expect(result.stdout.trim()).toEqual(
        '0x70a08231000000000000000000000000aca5bfc4beb54f3a8608e22f67e66594f532e8aa',
      )
    })
  })

  describe('decode', () => {
    it('decode a transfer transaction', async () => {
      const signature = 'transfer(address,uint256)'
      const data =
        '0xa9059cbb000000000000000000000000697dB915674bAc602F4d6fAfA31c0e45f386416E00000000000000000000000000000000000000000000000000000004ff043b9e'
      const result = shell.exec(`${binPath} method:decode '${signature}' '${data}'`, {
        silent: true,
      })

      expect(result.code).toEqual(0)

      const output = JSON.parse(result.stdout)

      expect(output).toHaveLength(2)
      expect(output[0]).toEqual('0x697dB915674bAc602F4d6fAfA31c0e45f386416E')
    })
  })
})
