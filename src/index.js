#!/usr/bin/env node

const command = process.argv[2]

if (!command) {
  usage()
  process.exit()
}

if (command === 'method') {
  const { sha3 } = require('ethereumjs-util')

  const signature = process.argv[3]

  if (!signature) {
    console.error('missing signature')
    process.exit(1)
  }

  const hash = sha3(signature)
    .toString('hex')
    .slice(0, 8)

  console.log(hash)
} else if (command === 'contract-address' || command === 'ca') {
  const getContractAddress = require('./getContractAddress')
  const [address, nonce] = process.argv.slice(3)

  const contractAddress = getContractAddress(address, nonce)

  console.log(contractAddress)
} else if (command === 'load-contract' || command === 'lc') {
  const loadContract = require('./loadContract')

  if (process.argv.length < 4) {
    usage()
    process.exit(1)
  }

  const [abiPath, address] = process.argv.slice(3)

  loadContract(abiPath, address)
} else if (command === 'repl') {
  const startRepl = require('./startRepl')
  startRepl(process.argv[3])
} else if (command === 'tx') {
  const getTransactionObject = require('./getTransactionObject')

  if (process.argv.length < 4) {
    usage()
    process.exit(1)
  }

  const transactionHash = process.argv[3]

  getTransactionObject(transactionHash).then(transactionObj => {
    console.log(JSON.stringify(transactionObj, null, 2))
  })
} else {
  console.error('Unrecognized command:', command)
  process.exit(1)
}

function usage() {
  console.log(
    [
      'eth contract-address <address> <nonce>    Get the address for a contract created from the given address with the given nonce',
      "eth load-contract <abiPath> <address>     Start a REPL that connects to a local eth node and loads the contract with the given ABI in the given address. The contract would be available as 'Contract'",
      'eth method <method>                       Get hash of the given method',
      "eth repl                                  Start a REPL that connects to a local eth node and exposes 'web3' and 'eth' objects",
      'eth tx <txHash>                           Print the transaction object for the given transaction hash'
    ].join(require('os').EOL)
  )
}
