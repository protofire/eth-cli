#!/usr/bin/env node

require('yargs')
  .option('url', {
    description: 'URL of the ethereum node to connect',
    default: 'http://localhost:8545'
  })
  .command(
    'method <signature>',
    'Get the hash of the given method',
    yargs => {
      yargs.positional('signature', {
        required: true
      })
    },
    argv => {
      const { sha3 } = require('ethereumjs-util')

      const hash = sha3(argv.signature)
        .toString('hex')
        .slice(0, 8)

      console.log(hash)
    }
  )
  .command(
    ['contract-address <account> [nonce]', 'ca'],
    'Get the address for a contract created from the given address with the given nonce',
    yargs => {
      yargs
        .positional('account', {
          required: true
        })
        .positional('nonce', {
          default: 0
        })
    },
    argv => {
      const getContractAddress = require('./getContractAddress')
      const { account, nonce } = argv

      const contractAddress = getContractAddress(account, nonce)

      console.log(contractAddress)
    }
  )
  .command(
    ['load-contract <abi> <address>', 'lc'],
    'Start a REPL that connects to a local eth node and loads the contract with the given ABI in the given address',
    yargs => {
      yargs.positional('abi', { required: true }).positional('address', { required: true })
    },
    argv => {
      const loadContract = require('./loadContract')

      const { abi, address, url } = argv

      loadContract(abi, address, url)
    }
  )
  .command(
    'repl',
    "Start a REPL that connects to a local eth node and exposes the 'web3' and 'eth' objects",
    () => {},
    argv => {
      const startRepl = require('./startRepl')
      const { url } = argv
      startRepl(url)
    }
  )
  .command(
    'tx <txHash>',
    'Print the transaction object for the given transaction hash',
    yargs => {
      yargs.positional('txHash', { required: true })
    },
    argv => {
      const getTransactionObject = require('./getTransactionObject')

      const { txHash, url } = argv

      getTransactionObject(txHash, url).then(transactionObj => {
        console.log(JSON.stringify(transactionObj, null, 2))
      })
    }
  )
  .command(
    'decode <functionSignature> <txData>',
    'Decode the arguments of the given transaction data for the given function signature',
    yargs => {
      yargs
        .positional('functionSignature', { required: true })
        .positional('txData', { required: true })
    },
    argv => {
      const decodeTxData = require('./decodeTxData')

      const { functionSignature, txData } = argv

      const result = decodeTxData(functionSignature, txData)

      console.log(result)
    }
  )
  .command(
    ['random-address [amount]', 'ra'],
    'Prints a random Ethereum checksum address. [amount] can be specified to generate a list of addresses.',
    yargs => {
      yargs.positional('amount', { default: 1 })
    },
    argv => {
      const utils = require('web3-utils')
      const amount = parseInt(argv.amount)

      if (!isNaN(amount) && amount > 0) {
        for (let i = 0; i < amount; i++) {
          const address = utils.toChecksumAddress(utils.randomHex(20))
          console.log(address)
        }
      }
    }
  )
  .command(
    ['vanity <prefix>'],
    'Generates a random address with the given prefix.',
    yargs => {
      yargs.positional('prefix', { required: true })
    },
    argv => {
      const { prefix } = argv
      const { randomBytes } = require('crypto')
      const wallet = new (require('web3-eth-accounts'))().wallet

      let acc = wallet.create(1, randomBytes(32))[0]
      while (acc.address.slice(2, 2 + prefix.length) !== prefix) {
        wallet.clear()
        acc = wallet.create(1, randomBytes(32))[0]
      }

      console.log(
        JSON.stringify(
          {
            address: acc.address,
            privateKey: acc.privateKey
          },
          null,
          2
        )
      )
    }
  )
  .strict()
  .demandCommand().argv
