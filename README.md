# eth-cli

A CLI swiss army knife for Ethereum developers

[![Donate with Ethereum](https://en.cryptobadges.io/badge/micro/0xe8cdf02efd8ab0a490d7b2cb13553389c9bc932e)](https://en.cryptobadges.io/donate/0xe8cdf02efd8ab0a490d7b2cb13553389c9bc932e)

[![Build Status](https://travis-ci.org/protofire/eth-cli.svg?branch=master)](https://travis-ci.org/protofire/eth-cli)
[![NPM version](https://badge.fury.io/js/eth-cli.svg)](https://npmjs.org/package/eth-cli)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/protofire/eth-cli/master/LICENSE)
[![dependencies Status](https://david-dm.org/protofire/eth-cli/status.svg)](https://david-dm.org/protofire/eth-cli)
[![devDependencies Status](https://david-dm.org/protofire/eth-cli/dev-status.svg)](https://david-dm.org/protofire/eth-cli?type=dev)

## Why use it?

`eth-cli` allows you to fetch data from the blockchain, start an interactive REPL connected to some node, call methods on deployed contracts, and more, all at the comfort of your command line. Checkout the [examples](#examples) below for more information or check the [full list of commands](docs/COMMANDS.md).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Installation](#installation)
- [Demo](#demo)
- [Examples](#examples)
  - [Fetch data from the blockchain](#fetch-data-from-the-blockchain)
  - [Start an interactive REPL connected to some node](#start-an-interactive-repl-connected-to-some-node)
  - [Call methods on deployed contracts](#call-methods-on-deployed-contracts)
- [Autocomplete](#autocomplete)
- [Init file](#init-file)
- [Sibling projects](#sibling-projects)
- [Back us](#back-us)
- [Credits](#credits)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

Install it globally:

```shell
npm install -g eth-cli
```

You can also try it with `npx`:

```
$ npx eth-cli repl --mainnet erc721@0x06012c8cf97bead5deae237070f9587f8e7a266d
> erc721.methods.name().call()
'CryptoKitties'
```

## Demo

Check [this screencast](https://www.youtube.com/watch?v=7tEUtg9DKTo) to see it in action.

## Examples

There are a lot of things that you can do with `eth-cli`, and we keep adding more. These are some of our favorites:

### Fetch data from the blockchain

Use commands like `block:number`, `tx:get` and `address:balance` to get information from the blockchain.

![Fetch data from the blockchain](img/fetching-data.gif)


[more examples](/example.md)

## Autocomplete

`eth-cli` supports some basic autocompletion, generated with [`completely`](https://github.com/fvictorio/completely).

The [completion](completion) directory has a bash completion script (`eth-completion.bash`) and a zsh completion script
(`_eth`). If you use bash, download the script and source it in your bashrc. If you use zsh, download the script and put
it in some directory in your [`fpath`](https://unix.stackexchange.com/questions/33255/how-to-define-and-load-your-own-shell-function-in-zsh).

## Init file

If you want to have some helper variables or functions in your REPL, you can create an init file that will be loaded
every time you use `eth repl`. Just create a file called `.eth_cli_repl_init.js` in your home directory. For example, if
you create it with some content like:

```js
module.exports = function(context) {
  context.toWei = x => context.web3.utils.toWei(x.toString())
  context.fromWei = x => context.web3.utils.fromWei(x.toString())
}
```

you will have `toWei` and `fromWei` as global functions in the REPL.


## Sibling projects

- [Solhint](https://github.com/protofire/solhint): A linter for the Solidity language.
- [ERCRef](https://github.com/ercref/ercref-contracts): a repository for ERC referecen implementations. See [this issue](https://github.com/ercref/ercref-contracts/pull/43) for usage.

## Back us

eth-cli is free to use and open-sourced. If you value our effort and feel like helping us to keep pushing this tool forward, you can send us a small donation. We'll highly appreciate it :)

[![Donate with Ethereum](https://en.cryptobadges.io/badge/micro/0xe8cdf02efd8ab0a490d7b2cb13553389c9bc932e)](https://en.cryptobadges.io/donate/0xe8cdf02efd8ab0a490d7b2cb13553389c9bc932e)

## Credits

Table of Contents *generated with [DocToc](https://github.com/thlorenz/doctoc)*
