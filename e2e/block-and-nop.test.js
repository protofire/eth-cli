const path = require('path')
const shell = require('shelljs')
const { PRIVATE_KEYS, RPC } = require('./common')

const binPath = path.join(__dirname, '..', 'bin', 'run')
const eth = args => shell.exec(`${binPath} ${args}`, { silent: true })

describe('block:number and tx:nop', () => {
  it('should change the current block number', async () => {
    const resultBlockNumber1 = eth(`block:number -n ${RPC}`)
    expect(resultBlockNumber1.code).toEqual(0)
    const blockNumberBefore = +resultBlockNumber1.stdout.trim()

    const resultTxNop = eth(`tx:nop -n ${RPC} --pk ${PRIVATE_KEYS[0]}`)
    expect(resultTxNop.code).toEqual(0)

    const resultBlockNumber2 = eth(`block:number -n ${RPC}`)
    expect(resultBlockNumber2.code).toEqual(0)
    const blockNumberAfter = +resultBlockNumber2.stdout.trim()

    expect(blockNumberAfter).toEqual(blockNumberBefore + 1)
  })
})
