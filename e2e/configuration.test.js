const path = require('path')
const shell = require('shelljs')
const { RPC } = require('./common')

const binPath = path.join(__dirname, '..', 'bin', 'run')

describe('configuration', () => {
  it('should add a custom network', async () => {
    const resultBlockNumber1 = shell.exec(`${binPath} block:number -n ganache`, { silent: true })
    expect(resultBlockNumber1.code).toEqual(1)

    const resultAddNetwork = shell.exec(`${binPath} network:add ganache --url ${RPC}`, { silent: true })
    console.log(resultAddNetwork.stderr)
    expect(resultAddNetwork.code).toEqual(0)

    const resultBlockNumber2 = shell.exec(`${binPath} block:number -n ganache`, { silent: true })
    expect(resultBlockNumber2.code).toEqual(0)
  })
})
