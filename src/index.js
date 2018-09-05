#!/usr/bin/env node

/**
 * Networks available
 */
const networks = {
  mainnet: 'https://mainnet.infura.io',
  ropsten: 'https://ropsten.infura.io',
  rinkeby: 'https://rinkeby.infura.io',
  kovan: 'https://kovan.infura.io',
  sokol: 'https://sokol.poa.network',
  poa: 'https://core.poa.network',
  local: 'http://localhost:8545'
}

let yargs = require('yargs')
  .option('url', {
    description: 'URL of the ethereum node to connect',
    default: 'http://localhost:8545',
    type: 'string'
  })
  .option('mainnet', {
    describe: `Url of the mainnet ethereum node to connect: ${networks.mainnet}`,
    type: 'boolean'
  })
  .option('ropsten', {
    describe: `Url of the ropsten ethereum node to connect: ${networks.ropsten}`,
    type: 'boolean'
  })
  .option('rinkeby', {
    describe: `Url of the rinkeby ethereum node to connect: ${networks.rinkeby}`,
    type: 'boolean'
  })
  .option('kovan', {
    describe: `Url of the kovan ethereum node to connect: ${networks.kovan}`,
    type: 'boolean'
  })
  .option('sokol', {
    describe: `Url of the sokol ethereum node to connect: ${networks.sokol}`,
    type: 'boolean'
  })
  .option('poa', {
    describe: `Url of the poa ethereum node to connect: ${networks.poa}`,
    type: 'boolean'
  })
  .option('local', {
    describe: `Url of the local ethereum node to connect: ${networks.local}`,
    type: 'boolean'
  })
  .check(function(argv) {
    const defaultUrl = yargs.getOptions().default.url
    let urlIsSet = argv.url !== defaultUrl

    Object.keys(argv)
      .filter(arg => networks[arg] && argv[arg]) // If option is not set, is false, must be checked
      .forEach(network => {
        if (urlIsSet) {
          throw new Error(
            'Only one network can be specified. Use --url or one of the aliases (--mainnet, --rinkeby, etc.)'
          )
        }
        argv.url = networks[network]
        urlIsSet = true
      })

    if (!argv.url) {
      throw new Error('The url arg must be specified')
    }

    return true
  })

yargs
  .command('completion', 'Generate bash completion script', yargs => {
    yargs.showCompletionScript()
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
  .command({
    command: 'network',
    desc: 'Allows actions with known networks',
    builder: yargs =>
      yargs
        .usage('usage: $0 network <SubCommand> [options]')
        .help('help')
        .updateStrings({
          'Commands:': 'SubCommand:'
        })
        .command({
          command: 'ids',
          desc: 'Show the network id for each known network',
          builder: {},
          handler: argv => {
            const { getIds } = require('./networks')
            const { display = 'json' } = argv
            const result = getIds()

            if (display.toLowerCase() === 'table') {
              const Table = require('cli-table')

              const table = new Table({
                head: Object.keys(result)
              })

              table.push(Object.values(result))

              console.log(table.toString())
            } else {
              console.log(JSON.stringify(result, null, 2))
            }
          }
        })
        .option('display', {
          desc: 'How to display data, table or json',
          type: 'string',
          global: true // <-- so it applies to the subcommand ids
        })
  })
  .strict()
  .demandCommand().argv
