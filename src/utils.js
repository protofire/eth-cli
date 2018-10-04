const fs = require('fs')
module.exports.showDataWithDisplay = (data, display) => {
  if (display.toLowerCase() === 'table') {
    const Table = require('cli-table')

    const table = new Table({
      head: Object.keys(data)
    })

    table.push(Object.values(data))

    console.log(table.toString())
  } else {
    console.log(JSON.stringify(data, null, 2))
  }
}

module.exports.add0x = hex => {
  return hex.indexOf('0x') === 0 ? hex : `0x${hex}`
}

module.exports.loadABI = abiPath => {
  const abiStr = fs.readFileSync(abiPath).toString()

  let abi = null

  try {
    abi = JSON.parse(abiStr)

    // Allow using truffle artifacts files too.
    // If abi variable it's an object and it has an abi property, interpret it as a truffle artifact
    if (abi.abi) {
      abi = abi.abi
    }
  } catch (e) {
    console.log('Error parsing abi', e)
    process.exit(1)
  }

  return abi
}
