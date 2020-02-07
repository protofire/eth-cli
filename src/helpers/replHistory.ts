import fs from 'fs'
export default function(repl: any, file: string) {
  try {
    repl.history = fs
      .readFileSync(file, 'utf-8')
      .split('\n')
      .reverse()
    repl.history.shift()
    repl.historyIndex = -1 // will be incremented before pop
  } catch (e) {}

  const fd = fs.openSync(file, 'a')
  const wstream = fs.createWriteStream(file, {
    fd: fd,
  })
  wstream.on('error', function(err: any) {
    throw err
  })

  repl.addListener('line', function(code: string) {
    if (code && code !== '.history') {
      wstream.write(code + '\n')
    } else {
      repl.historyIndex++
      repl.history.pop()
    }
  })

  process.on('exit', function() {
    fs.closeSync(fd)
  })

  repl.commands['history'] = {
    help: 'Show the history',
    action: function() {
      const out: string[] = []
      repl.history.forEach(function(v: string) {
        out.push(v)
      })
      repl.outputStream.write(out.reverse().join('\n') + '\n')
      repl.displayPrompt()
    },
  }
}
