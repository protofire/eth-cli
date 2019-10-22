const path = require('path')
const shell = require('shelljs')
const { RPC } = require('./common')

const binPath = path.join(__dirname, '..', 'bin', 'run')
const eth = args => shell.exec(`${binPath} ${args}`, { silent: true })
const boxAbiPath = path.join(__dirname, 'test-contracts', 'Box.abi')

describe('configuration', () => {
  it('should allow configuring networks', () => {
    // try to use a custom network before adding it
    {
      const result = eth('block:number -n ganache')
      expect(result.code).not.toEqual(0)
    }

    // add custom network
    {
      const result = eth(`network:add ganache --url ${RPC}`)
      expect(result.code).toEqual(0)
    }

    // use custom network
    {
      const result = eth('block:number -n ganache')
      expect(result.code).toEqual(0)
    }

    // check that networks shows up in the list
    {
      const result = eth('network:list --json')
      expect(result.code).toEqual(0)
      const networks = JSON.parse(result.stdout)
      expect(networks.ganache.url).toEqual(RPC)
      expect(networks.ganache.id).toBeUndefined()
    }

    // update network
    {
      const result = eth('network:update ganache --id 50')
      expect(result.code).toEqual(0)
    }

    // check that network was correctly updated
    {
      const result = eth('network:list --json')
      expect(result.code).toEqual(0)
      const networks2 = JSON.parse(result.stdout)
      expect(networks2.ganache.url).toEqual(RPC)
      expect(networks2.ganache.id).toEqual(50)
    }

    // remove network
    {
      const result = eth('network:remove ganache')
      expect(result.code).toEqual(0)
    }

    // check that network was correctly removed
    {
      const result = eth('network:list --json')
      expect(result.code).toEqual(0)
      const networks3 = JSON.parse(result.stdout)
      expect(networks3.ganache).toBeUndefined()
    }
  })
  it('should allow configuring abis', () => {
    // try to use a custom abi before adding it
    {
      const result = eth('abi:methods box')
      expect(result.code).not.toEqual(0)
    }

    // add custom abi
    {
      const result = eth(`abi:add box ${boxAbiPath}`)
      expect(result.code).toEqual(0)
    }

    // to use a custom abi after adding it
    {
      const result = eth('abi:methods box')
      expect(result.code).toEqual(0)
    }

    // remove custom abi
    {
      const result = eth('abi:remove box')
      expect(result.code).toEqual(0)
    }
  })
})
