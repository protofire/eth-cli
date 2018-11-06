#!/usr/bin/env node

const networks = require('./networks')

let yargs = require('yargs').option('url', {
  description: 'URL of the ethereum node to connect',
  default: 'http://localhost:8545',
  type: 'string'
})

// register a flag for each known network
Object.keys(networks).forEach(network => {
  const { label } = networks[network]
  yargs.option(network, {
    describe: `Connect to ${label} network`,
    type: 'boolean'
  })
})

yargs.check(function(argv) {
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
      argv.url = networks[network].url
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
  .command({
    command: ['method', 'm'],
    desc: "Actions for Contract's methods",
    builder: yargs =>
      yargs
        .usage('usage: method <Subcommand>')
        .help('help')
        .updateStrings({
          'Commands:': 'Subcommand:'
        })
        .command({
          command: ['hash <signature>', 'hs', 'h'],
          desc: 'Get the hash of the given method',
          builder: {},
          handler: argv => {
            const { sha3 } = require('ethereumjs-util')

            const hash = sha3(argv.signature)
              .toString('hex')
              .slice(0, 8)

            console.log(hash)
          }
        })
        .command({
          command: ['encode <abi> <methodCall>', 'e'],
          desc: 'Encodes the ABI for the method <methodCall> and returns the ABI byte code',
          builder: yargs => {
            yargs.positional('methodCall', {
              describe: 'e.g.: \'myMethod(arg1,arg2,["a","b",3,["d","0x123..."]])\''
            })
          },
          handler: argv => {
            const encode = require('./encode')
            const { abi, methodCall, url } = argv

            const result = encode(abi, methodCall, url)

            console.log(result)
          }
        })
        .command({
          command: ['send-transaction <encodedABI> <address> <pk>', 'st'],
          desc:
            'Sends the transaction for the contract in <address> with <encodedABI> using private key <pk>',
          builder: yargs => {
            yargs.positional('address', { description: "contract's address" })
          },
          handler: argv => {
            const sendTransaction = require('./sendTransaction')
            const { encodedABI, address, pk, url } = argv

            sendTransaction(encodedABI, address, pk, url)
              .then(console.log)
              .catch(console.error)
          }
        })
        .command({
          command: ['send <abi> <methodCall> <address> <pk>', 's'],
          desc:
            'Executes <methodCall> for the contract in <address> given <abi> using private key <pk>',
          builder: yargs => {
            yargs.positional('methodCall', {
              required: true,
              describe: 'e.g.: \'myMethod(arg1,arg2,["a","b",3,["d","0x123..."]])\''
            })
            yargs.positional('address', { required: true, description: "contract's address" })
          },
          handler: argv => {
            const encode = require('./encode')
            const sendTransaction = require('./sendTransaction')
            const { abi, methodCall, address, pk, url } = argv

            sendTransaction(encode(abi, methodCall, url), address, pk, url)
              .then(console.log)
              .catch(console.error)
          }
        })
        .demandCommand()
  })
  .command(
    'methods <abi>',
    'Get the hash of each method in the given ABI',
    yargs => {
      yargs.positional('abi', {
        required: true
      })
    },
    argv => {
      const getMethods = require('./getMethods')
      const { abi } = argv

      const methods = getMethods(abi)

      methods.forEach(({ signature, signatureHash }) => {
        console.log(`${signatureHash}\t${signature}`)
      })
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
    ['load-contract <abi> <address> [rest..]', 'lc'],
    'Start a REPL that connects to a local eth node and loads the contract with the given ABI in the given address',
    yargs => {
      yargs
        .positional('abi', { required: true })
        .positional('address', { required: true })
        .positional('rest', {
          describe: 'pairs of ABI address for loading extra contracts [[abi address]..]'
        })
    },
    argv => {
      const loadContract = require('./loadContract')

      const { abi, address, rest, url } = argv

      if (rest.length % 2 !== 0) {
        throw new Error('eth load-contract: You must specify an address for each contract')
      }

      loadContract(abi, address, rest, url)
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
      const { getTransaction, getReceipt } = require('./getTransactionObject')
      const { txHash, url } = argv
      const promises = [getTransaction(txHash, url), getReceipt(txHash, url)]

      Promise.all(promises).then(([transaction, receipt]) => {
        if (transaction) {
          transaction.receipt = receipt
        }
        console.log(JSON.stringify(transaction, null, 2))
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
    ['random-address [amount] [prefix]', 'ra'],
    'Prints a random Ethereum checksum address with its Private Key',
    yargs => {
      yargs.positional('amount', {
        default: 1,
        description: 'Can be specified to generate a list of addresses.'
      })
      yargs.option('prefix', {
        default: '',
        description: 'Generates a random address with the given prefix.'
      })
    },
    argv => {
      const randomAddress = require('./randomAddress')
      const { amount, prefix } = argv

      randomAddress(amount, prefix)
        .then(accounts => {
          accounts.forEach(account => console.log(JSON.stringify(account, null, 2)))
        })
        .catch(console.error)
    }
  )
  .command(
    ['nop <pk>'],
    'Generates a transaction that does nothing with the given private key',
    yargs => {
      yargs.positional('pk', { required: true })
    },
    argv => {
      const generateNop = require('./generateNop')
      const { pk, url } = argv

      generateNop(url, pk).then(tx => {
        console.log(tx)
      })
    }
  )
  .command(
    ['deploy <pk> <bin>'],
    'Deploy contract whose bytecode is in <bin> using private key <pk>',
    yargs => {
      yargs.positional('pk', { required: true })
      yargs.positional('bin', { required: true })
    },
    argv => {
      const deploy = require('./deploy')
      const { bin, pk, url } = argv

      deploy(url, pk, bin)
        .then(console.log)
        .catch(console.error)
    }
  )
  .command({
    command: 'network',
    desc: 'Allows actions with known networks',
    builder: yargs =>
      yargs
        .usage('usage: $0 network <Subcommand> [options]')
        .help('help')
        .updateStrings({
          'Commands:': 'Subcommand:'
        })
        .command({
          command: 'ids',
          desc: 'Show the network id for each known network',
          builder: {},
          handler: argv => {
            const { showDataWithDisplay } = require('./utils')
            const { display = 'json' } = argv

            const networksIds = Object.keys(networks).reduce((result, network) => {
              result[network] = networks[network].id
              return result
            }, {})

            showDataWithDisplay(networksIds, display)
          }
        })
        .command({
          command: 'urls',
          desc: 'Show the network url for each known network',
          builder: {},
          handler: argv => {
            const { showDataWithDisplay } = require('./utils')
            const { display = 'json' } = argv

            const networksUrls = Object.keys(networks).reduce((result, network) => {
              result[network] = networks[network].url
              return result
            }, {})

            showDataWithDisplay(networksUrls, display)
          }
        })
        .option('display', {
          desc: 'How to display data, table or json',
          type: 'string',
          global: true // <-- so it applies to the subcommand ids
        })
        .demandCommand()
  })
  .strict()
  .demandCommand().argv
