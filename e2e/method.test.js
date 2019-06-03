const path = require('path')
const shell = require('shelljs')

const binPath = path.join(__dirname, '..', 'bin', 'run')
const testAbis = path.join(__dirname, 'abi')

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
      const result = shell.exec(`${binPath} method:encode '${erc20Abi}' '${signature}'`, { silent: true })

      expect(result.code).toEqual(0)

      expect(result.stdout.trim()).toEqual('0x18160ddd')
    })

    it('should encode the balanceOf method', () => {
      const signature = 'balanceOf("0xacA5Bfc4beb54f3A8608e22F67e66594F532e8Aa")'
      const result = shell.exec(`${binPath} method:encode '${erc20Abi}' '${signature}'`, { silent: true })

      expect(result.code).toEqual(0)

      expect(result.stdout.trim()).toEqual('0x70a08231000000000000000000000000aca5bfc4beb54f3a8608e22f67e66594f532e8aa')
    })
  })
})
