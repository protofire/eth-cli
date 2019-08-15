# eth-cli

[![Donate with Ethereum](https://en.cryptobadges.io/badge/micro/0xe8cdf02efd8ab0a490d7b2cb13553389c9bc932e)](https://en.cryptobadges.io/donate/0xe8cdf02efd8ab0a490d7b2cb13553389c9bc932e)

[![Build Status](https://travis-ci.org/protofire/eth-cli.svg?branch=master)](https://travis-ci.org/protofire/eth-cli)
[![NPM version](https://badge.fury.io/js/eth-cli.svg)](https://npmjs.org/package/eth-cli)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/protofire/eth-cli/master/LICENSE)
[![dependencies Status](https://david-dm.org/protofire/eth-cli/status.svg)](https://david-dm.org/protofire/eth-cli)
[![devDependencies Status](https://david-dm.org/protofire/eth-cli/dev-status.svg)](https://david-dm.org/protofire/eth-cli?type=dev)

CLI swiss knife for Ethereum developers.

## What is this

`eth-cli` is a collection of commands that can help you develop dapps
for Ethereum. Check the [Examples](#examples)
section or the [list of commands](#commands) to find out what you can do with it.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [eth-cli](#eth-cli)
  - [What is this](#what-is-this)
  - [Examples](#examples)
    - [Start a REPL to interact with an RPC node](#start-a-repl-to-interact-with-an-rpc-node)
    - [Generate a random address](#generate-a-random-address)
    - [Get info about the most popular chains](#get-info-about-the-most-popular-chains)
  - [Installation](#installation)
  - [Commands](#commands)
    - [`abi`](#abi)
      - [`abi:list`](#abilist)
      - [`abi:methods`](#abimethods)
      - [`abi:show`](#abishow)
    - [`conf`](#conf)
      - [`conf:abi:add`](#confabiadd)
      - [`conf:abi:remove`](#confabiremove)
      - [`conf:address:add`](#confaddressadd)
      - [`conf:address:get`](#confaddressget)
      - [`conf:address:list`](#confaddresslist)
      - [`conf:address:remove`](#confaddressremove)
    - [`contract`](#contract)
      - [`contract:address`](#contractaddress)
      - [`contract:deploy`](#contractdeploy)
    - [`method`](#method)
      - [`method:decode`](#methoddecode)
      - [`method:encode`](#methodencode)
      - [`method:hash`](#methodhash)
      - [`method:send`](#methodsend)
      - [`method:send-transaction`](#methodsend-transaction)
    - [`networks`](#networks)
    - [`randomAddress`](#randomaddress)
    - [`transaction`](#transaction)
      - [`transaction:get`](#transactionget)
      - [`transaction:nop`](#transactionnop)
    - [`repl`](#repl)
  - [Back us](#back-us)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Examples

There are a lot of things that you can do with `eth-cli`, and we keep adding more. These are some of our favorites:

### Start a REPL to interact with an RPC node

You can start a REPL to interact with the blockchain. By default it connects to `http://localhost:8545`, but you can use it with any chain.

```
$ eth repl --mainnet

> web3.eth.getBlockNumber()
6023243
```

This is a regular node REPL, but it includes a `web3` object that connects to the specified chain.

You can also preload some contracts using a `<abi>@<address>` syntax:

```
$ eth repl --mainnet erc721@0x06012c8cf97bead5deae237070f9587f8e7a266d
> erc721.methods.name().call()
'CryptoKitties'
```

### Generate a random address

Do you need a placeholder for an address? Run `eth ra` (alias for `eth randomAddress`):

```
$ eth ra
{
  "address": "0x0e1c447DE1e870b5056e596C80e34da26569Deb2",
  "privateKey": "0x9093070def746fe7a3ad548b10dc0e6f861dc8753a41cd062de32c298517d4eb"
}
```

### Get info about the most popular chains

Do you keep forgetting what is the id of rinkeby? Just run `eth networks
--table` to get information about each chain known by `eth-cli`.

```
$ eth networks --table
Id     Name        Url
1      Mainnet     https://mainnet.infura.io
3      Ropsten     https://ropsten.infura.io
4      Rinkeby     https://rinkeby.infura.io
30     RSK         https://public-node.rsk.co
31     RSK testnet https://public-node.testnet.rsk.co
42     Kovan       https://kovan.infura.io
77     Sokol       https://sokol.poa.network
99     POA         https://core.poa.network
100    xDAI        https://dai.poa.network
```

If you have [`jq`](https://stedolan.github.io/jq/) installed, you can do something like:

```
$ eth networks | jq .rinkeby.id
4
```

## Installation

Install it globally:

`npm install -g eth-cli`

You can also try it out with `npx`:

```
$ npx eth-cli repl --mainnet erc721@0x06012c8cf97bead5deae237070f9587f8e7a266d
> erc721.methods.name().call()
'CryptoKitties'
```

## Commands

### `abi`

Commands to interact with ABIs.

#### `abi:list`

Show the list of ABIs that `eth-cli` knows.

```
$ eth abi:list
ERC20
ERC721
```

#### `abi:methods`

Prints the methods of the given ABI, along with their hashes:

```
$ eth abi:methods erc20
06fdde03	name()
095ea7b3	approve(address,uint256)
18160ddd	totalSupply()
23b872dd	transferFrom(address,address,uint256)
313ce567	decimals()
70a08231	balanceOf(address)
95d89b41	symbol()
a9059cbb	transfer(address,uint256)
dd62ed3e	allowance(address,address)
```

#### `abi:show`

Print one of the known ABIs:

```
$ eth abi:show erc20
[
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
...
```
### `conf`

Configure eth-cli.

#### `conf:abi:add`

Add a known ABI. You can later use the name of this known ABI in other commands.

```
$ eth conf:abi:add erc777 ./path/to/erc777.json
$ eth repl --mainnet erc777@0x...
```

#### `conf:abi:remove`

Remove a known ABI. This only works for ABIs added with `conf:abi:add`; ABIs that come with `eth-cli` cannot be remobed.

```
$ eth conf:abi:remove erc777
```

#### `conf:address:add`

Add a known address. You can later use the name of this known address in other commands.

```
$ eth conf:address:add rinkeby1 0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d
{
  "name": "rinkeby1",
  "address": "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1"
}
$ eth repl --rinkeby --pk rinkeby1
rinkeby> accounts[0]
'0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1'
```

#### `conf:address:get`

Show the data of a known address.

```
➜ eth conf:address:get rinkeby1   
{
  "privateKey": "0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d",
  "address": "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1"
}
```

#### `conf:address:list`

List known addresses.

```
$ eth conf:address:list        
[
  "ganache1"
]
```

#### `conf:address:remove`

Remove a known address.

```
$ eth conf:address:remove rinkeby1
% eth conf:address:list           
[]
```

### `contract`

Commands to interact with contracts.

#### `contract:address`

When a contract is deployed, the address of that contract is computed from the
address of the account that deployed it and the nonce (number of transactions)
of that account. This method shows what will be the address of a contract
deployed from a given address with a given nonce (default 0).

```
$ eth contract:address 0x92970dbD5C0Ee6b439422bFd7cD71e1DDA921A03
0x68ba6833b22f414e97a7aa23908428163be96e9b

$ eth contract:address 0x92970dbD5C0Ee6b439422bFd7cD71e1DDA921A03 3
0x4c2935ebef0fbda1f3b77c1f65200603ca6c80ef
```

#### `contract:deploy`

Deploy a contract using the given private key. The second argument is a path to
a file with the compiled contract. You can generate this file using
[`solc-js`](https://github.com/ethereum/solc-js):

```
$ solcjs --bin MyContract.sol
```

And then deploy it with `eth-cli`:

```
$ eth contract:deploy 0xdfc44755392f7b4402a3c32a3c09d6afdbbf8c161261774136c52c57f33dc8c1 ./MyContract_sol_MyContract.bin
```

**As with all commands that use a private key, this should only be used for
testing. `eth-cli` is NOT meant to be used with real assets**

### `method`

#### `method:decode`

Decode the arguments of some transaction data that called a contract method.

```
$ eth method:decode 'transfer(address,uint256)' '0xa9059cbb000000000000000000000000697dB915674bAc602F4d6fAfA31c0e45f386416E00000000000000000000000000000000000000000000000000000004ff043b9e'
[
  "0x697dB915674bAc602F4d6fAfA31c0e45f386416E",
  "0x04ff043b9e"
]
```

#### `method:encode`

Get the bytecode for a method call. The first argument is a path to an ABI file,
or one of the known ABIs. The second argument is the call to the method.

```
$ eth method:encode erc20 'totalSupply()'
0x18160ddd
```

#### `method:hash`

Get the hash of a method signature. These are the first four bytes that compose the data of a transaction that invokes a method contract.

```
$ eth method:hash 'totalSupply()'
18160ddd
```

#### `method:send`

Invokes a method in a contract, using the given private key.

```
$ eth method:send erc20 'transfer("0xb2E4a264A982039f8E503ea3C83af5537f583069", "0xDa480B4852ca3aDE4acF3eeCA6901952EdbAe912")' 0x15503FBAb2fa57535092ab9c24740142Ab6cabd3 0x6db0bdfc7800dcf87b5a88b3363997360395d36ef51db10c3458d51d8aefd37e
```

**As with all commands that use a private key, this should only be used for
testing. `eth-cli` is NOT meant to be used with real assets**

#### `method:send-transaction`

Like `method:send`, but with the method call already encoded:

```
$ eth method:send-transaction 0xa9059cbb000000000000000000000000b2e4a264a982039f8e503ea3c83af5537f583069000000000000000000000000da480b4852ca3ade4acf3eeca6901952edbae912 0x15503FBAb2fa57535092ab9c24740142Ab6cabd3 0x6db0bdfc7800dcf87b5a88b3363997360395d36ef51db10c3458d51d8aefd37e
```

### `networks`

Prints the networks that `eth-cli` know:

```
$ eth networks
{
  "kovan": {
    "url": "https://kovan.infura.io",
    "id": 42,
    "label": "Kovan"
  },
  "mainnet": {
    "url": "https://mainnet.infura.io",
    "id": 1,
    "label": "Mainnet"
  },
  ...
}
```

You can easily combine this with [`jq`](https://stedolan.github.io/jq/):

```
$ eth networks | jq .kovan.id
42
```

### `randomAddress`

Generates one or more random address:

```
$ eth randomAddress
{
  "address": "0x64fC64e77dC9040F484A3d2aDc0dC425Fa05a8D5",
  "privateKey": "0x117af9e714286508852d36cba93ac3d5917d14bf3bfb7e0a1b39e7c6c404e690"
}
$ eth randomAddress 3
{
  "address": "0xBb0144ba4fe2F10ACa2b11c8882183Ef643feCa9",
  "privateKey": "0x8218cd827a556fd924783e0d7a5d24a219cbd6ad984f4fbd0462927273feb774"
}
{
  "address": "0x04a08b29D4527B22e07c1aB3F8F393650452Fa25",
  "privateKey": "0xb44dd496a80a19f18d86a68890e1a52d84729d6adcc03b8a6dc5423f744e7389"
}
{
  "address": "0x3FE05C595c28CA01dC4cC4368362eA982FC23524",
  "privateKey": "0x286f60a2fab2bcbd1977af4fb3f502b0c92b13ea32fab7cda21fefd9d721e66a"
}
```

You can also specify a string to generate an address that starts with that prefix:

```
$ eth randomAddress 1 aaa
{
  "address": "0xaaa943F3cB8B5af6dB93A6BB594C6B6D202fC7Ab",
  "privateKey": "0x3ef9597d313e1f3663f160e03f9ce7b1909d18d713cb5cbe18ddfd1f15241a42"
}
```

### `transaction`

Commands to interact with transactions.

#### `transaction:get`

Print the transaction object for the given transaction hash.

```
$ eth tx:get --kovan 0x7f3f2967b93a7eded18071a596b7f3987c9575b6bae0a19399725c19e793517b
{
  "blockHash": "0xc85b64cdb940da308058b1f0ae800954a09287e2b8d30e71f02e1a4cf5b1a03b",
  "blockNumber": 11365979,
  "chainId": "0x2a",
  ...
```

The transaction object will also include a `receipt` key, that will have the
receipt object if the transaction was mined, or will be null otherwise.

#### `transaction:nop`

Generate a transaction that does nothing (it sends 0 ETH to itself) using the given private key:

```
$ eth tx:nop --kovan --pk 0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d
"0x7f3f2967b93a7eded18071a596b7f3987c9575b6bae0a19399725c19e793517b"
```

**As with all commands that use a private key, this should only be used for
testing. `eth-cli` is NOT meant to be used with real assets**

### `repl`

You can start a REPL to interact with the blockchain. By default it connects to
`http://localhost:8545`, but you can use it with any chain.

```
$ eth repl --mainnet

> eth.getBlockNumber()
6023243
```

You can also use this commant to load some contracts:

```
$ eth repl ./path/to/myContract.abi.json@0xc0feee...

> myContract.methods.someMethod().call()
```

There are some known ABIs (check `eth abi:list` to see which ones) that you can use instead of indicating a path:

```
$ eth repl erc20@0xc0feee...

> myContract.methods.totalSupply().call()
```

## Back us

eth-cli is free to use and open-sourced. If you value our effort and feel like helping us to keep pushing this tool forward, you can send us a small donation. We'll highly appreciate it :)

[![Donate with Ethereum](https://en.cryptobadges.io/badge/micro/0xe8cdf02efd8ab0a490d7b2cb13553389c9bc932e)](https://en.cryptobadges.io/donate/0xe8cdf02efd8ab0a490d7b2cb13553389c9bc932e)
