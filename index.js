#!/usr/bin/env node
const { sha3 } = require('ethereumjs-util')

const getContractAddress = require('./get-contract-address')
const loadContract = require('./loadContract')
const startRepl = require('./startRepl')
const getTransactionObject = require('./getTransactionObject')

const action = process.argv[2]

if (!action) {
  usage();
  process.exit()
}

if (action === 'method') {
  const signature = process.argv[3]

  if (!signature) {
    console.error('missing signature')
    process.exit(1)
  }

  const hash = sha3(signature).toString('hex').slice(0, 8)

  console.log(hash)
} else if (action === 'contract-address' || action === 'ca') {
  const [address, nonce] = process.argv.slice(3);

  const contractAddress = getContractAddress(address, nonce)

  console.log(contractAddress)
} else if (action === 'load-contract' || action === 'lc') {
  if (process.argv.length < 4) {
    usage()
    process.exit(1)
  }

  const [abiPath, address] = process.argv.slice(3)

  loadContract(abiPath, address)
} else if (action === 'repl') {
  startRepl()
} else if (action === 'tx') {
  if (process.argv.length < 4) {
    usage()
    process.exit(1)
  }

  const transactionHash = process.argv[3]

  getTransactionObject(transactionHash)
    .then((transactionObj) => {
      console.log(JSON.stringify(transactionObj, null, 2))
    })
} else {
  console.error('Unrecognized action:', action)
  process.exit(1)
}

function usage() {
  console.log([
    'eth method <method>                       Get hash of the given method',
    'eth contract-address <address> <nonce>    Get the address for a contract created from the given address with the given nonce',
    'eth load-contract <abiPath> <address>     Start a REPL that connects to a local eth node and loads the contract with the given ABI in the given address. The contract would be available as \'Contract\''
  ].join(require('os').EOL))
}
