const path = require('path')
const shell = require('shelljs')

const binPath = path.join(__dirname, '..', 'bin', 'run')

describe('running eth without commands', () => {
  it('should show the help when running it without arguments', async () => {
    const result = shell.exec(`${binPath}`, { silent: true })

    expect(result.code).toEqual(0)
    expect(result.stdout).toMatch(/USAGE/)
  })

  it('should show the help when running it with -h', async () => {
    const result = shell.exec(`${binPath} -h`, { silent: true })

    expect(result.code).toEqual(0)
    expect(result.stdout).toMatch(/USAGE/)
  })

  it('should show the help when running it with --help', async () => {
    const result = shell.exec(`${binPath} --help`, { silent: true })

    expect(result.code).toEqual(0)
    expect(result.stdout).toMatch(/USAGE/)
  })

  it('should show the help when running the help command', async () => {
    const result = shell.exec(`${binPath} help`, { silent: true })

    expect(result.code).toEqual(0)
    expect(result.stdout).toMatch(/USAGE/)
  })
})
