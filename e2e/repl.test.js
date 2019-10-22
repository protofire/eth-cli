const { exec } = require('child_process')
const path = require('path')
const { RPC } = require('./common')

const binPath = path.join(__dirname, '..', 'bin', 'run')

const runRepl = async inputs => {
  return new Promise(resolve => {
    const child = exec(`${binPath} repl -n ${RPC}`, (error, stdout) => {
      if (error) {
        console.error(error)
      }

      const outputs = stdout
        .split(`${RPC}> `)
        .map(x => x.trim())
        .filter(Boolean)

      resolve(outputs)
    })

    for (const input of inputs) {
      child.stdin.write(`${input}\n`)
    }
    child.stdin.end()
  })
}

describe('repl', () => {
  it('should start a node repl', async () => {
    const outputs = await runRepl(['2+2'])
    expect(outputs).toEqual(['4'])
  })

  it('should expose web3', async () => {
    const outputs = await runRepl(['typeof web3'])
    expect(outputs).toEqual(["'object'"])
  })
})
