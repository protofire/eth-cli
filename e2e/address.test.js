const path = require('path')
const shell = require('shelljs')

const binPath = path.join(__dirname, '..', 'bin', 'run')

describe('address', () => {
  describe('address:random', () => {
    it('should print a random address with its private key', async () => {
      const result = shell.exec(`${binPath} address:random`, { silent: true })

      expect(result.code).toEqual(0)

      const output = parse(result.stdout)

      expect(output.length).toEqual(1)
      expect(output[0]).toHaveProperty('address')
      expect(output[0]).toHaveProperty('privateKey')
    })

    it('should print two random addresses with their private key', async () => {
      const result = shell.exec(`${binPath} address:random 2`, { silent: true })

      expect(result.code).toEqual(0)

      const output = parse(result.stdout)

      expect(output.length).toEqual(2)
      expect(output[0]).toHaveProperty('address')
      expect(output[0]).toHaveProperty('privateKey')
      expect(output[1]).toHaveProperty('address')
      expect(output[1]).toHaveProperty('privateKey')
    })

    it('should print different addresseses with their private key', async () => {
      const result = shell.exec(`${binPath} address:random 3`, { silent: true })

      expect(result.code).toEqual(0)

      const output = parse(result.stdout)

      expect(output.length).toEqual(3)
      expect(output[0].address).not.toEqual(output[1].address)
      expect(output[0].address).not.toEqual(output[2].address)
      expect(output[1].address).not.toEqual(output[2].address)
      expect(output[0].privateKey).not.toEqual(output[1].privateKey)
      expect(output[0].privateKey).not.toEqual(output[2].privateKey)
      expect(output[1].privateKey).not.toEqual(output[2].privateKey)
    })
  })

  function parse(output) {
    const outputReplaced = `[${output.replace(/}/g, '},')}]`
    const lastBrace = outputReplaced.lastIndexOf('},')
    const outputJSON =
      outputReplaced.slice(0, lastBrace) + '}' + outputReplaced.slice(lastBrace + 2)
    return JSON.parse(outputJSON)
  }
})
