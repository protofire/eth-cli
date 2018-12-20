# eth-cli
[![Donate with Ethereum](https://en.cryptobadges.io/badge/micro/0xe8cdf02efd8ab0a490d7b2cb13553389c9bc932e)](https://en.cryptobadges.io/donate/0xe8cdf02efd8ab0a490d7b2cb13553389c9bc932e)

[![Build Status](https://travis-ci.org/protofire/eth-cli.svg?branch=master)](https://travis-ci.org/protofire/eth-cli)
[![NPM version](https://badge.fury.io/js/eth-cli.svg)](https://npmjs.org/package/eth-cli)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/protofire/eth-cli/master/LICENSE)
[![dependencies Status](https://david-dm.org/protofire/eth-cli/status.svg)](https://david-dm.org/protofire/eth-cli)
[![devDependencies Status](https://david-dm.org/protofire/eth-cli/dev-status.svg)](https://david-dm.org/protofire/eth-cli?type=dev)

A collection of CLI tools to help with ethereum learning and development.

## REPL

You can start a REPL to interact with the blockchain. By default it connects to
`http://localhost:8545`, but you can use it with any chain.

```
$ eth repl --mainnet

> eth.getBlockNumber()
6023243
```

This is just a node REPL with some extra stuff, so whatever you can do in the
node REPL you can do it here. The extra stuff includes:

- A web3 instance connected to the chain you selected (and a `eth` shortcut to
  `web3.eth`).
- Promises are resolved automatically and their result is shown.

### Load contract

A command similar to `eth repl` is `eth load-contract`. It has the same features
as the REPL, but it also exposes a variable with an instance of the
contract you specified. The name of this variable will be inferred from the ABI file: using
`path/to/MyContract.abi` will expose a `MyContract` variable.
You do this by passing the address of the contract and a path to its ABI as arguments:

```
$ eth load-contract path/to/MyContract.abi 0xd833215cbcc3f914bd1c9ece3ee7bf8b14f841bb
> MyContract.methods.add(2, 2).call()
4
```

The specified ABI can also be a Truffle artifact. In that case, the ABI will be
extracted from it.

# Other commands

Some other things that can be done with it:

- Generate one (or more) random addresses with `eth random-address` (or its
  alias, `eth ra`):

  ```
  $ eth random-address
  0xeBF73aF39E93941C8DfA951B6C78743eBAd7A962

  $ eth ra
  0x5D50c5c056e52064EbD91784A6fc6F63Cad0F8A8

  $ eth random-address 3
  0xF77b069A8b4d65A5010865621CF1cd74bC799a6b
  0xa3108a1fC9F546C8d8435b20ea3375Ee0F927763
  0xe8257e4891F570D613C6851F9962141575105A87
  ```

- Get the transaction object for a given transaction hash:

  ```
  $ eth --rinkeby tx 0x1622b3d486ff106cd434e749e35a288c3cda35de75884fa4d3b94bcc28d1f100
  {
    "blockHash": "0x885438d0f4c98518597576a9e63e682b825d382197802fa4493634d08901c7d7",
    "blockNumber": 2568527,
    ...
    "v": "0x1b",
    "r": "0xe57f0e9292ab8c25dafebe595b23b084ffdfac3c44f562d65376d2f5470e3947",
    "s": "0x5785816efd0f564b313235a0ab3009ad45e8017db802a6500bd2da977724796a"
  }
  ```

- Get the hash for a given method signature:

  ```
  $ eth method 'transfer(address,uint256)'
  a9059cbb
  ```

- Get the address where a contract will be deployed, given the address of the
  account that will create it and its nonce:

  ```
  $ eth contract-address 0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1 5
  0xd833215cbcc3f914bd1c9ece3ee7bf8b14f841bb
  ```

Just run `eth` to see the full list of commands.

## Installation

`npm install -g eth-cli`

 ## Back us
eth-cli is free to use and open-sourced. If you value our effort and feel like helping us to keep pushing this tool forward, you can send us a small donation. We'll highly appreciate it :)
 
[![Donate with Ethereum](https://en.cryptobadges.io/badge/micro/0xe8cdf02efd8ab0a490d7b2cb13553389c9bc932e)](https://en.cryptobadges.io/donate/0xe8cdf02efd8ab0a490d7b2cb13553389c9bc932e)
 
