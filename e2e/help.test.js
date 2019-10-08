const path = require('path')
const shell = require('shelljs')

const binPath = path.join(__dirname, '..', 'bin', 'run')
const eth = args => shell.exec(`${binPath} ${args}`, { silent: true })

describe('running eth without commands', () => {
  it('should show the help when running it without arguments', async () => {
    const result = eth('')

    expect(result.code).toEqual(0)
    expect(result.stdout).toMatch(/USAGE/)
  })

  it('should show the help when running it with -h', async () => {
    const result = eth(`-h`)

    expect(result.code).toEqual(0)
    expect(result.stdout).toMatch(/USAGE/)
  })

  it('should show the help when running it with --help', async () => {
    const result = eth(`--help`)

    expect(result.code).toEqual(0)
    expect(result.stdout).toMatch(/USAGE/)
  })

  it('should show the help when running the help command', async () => {
    const result = eth(`help`)

    expect(result.code).toEqual(0)
    expect(result.stdout).toMatch(/USAGE/)
  })
})
