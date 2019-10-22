<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
This is the full list of commands supported by `eth-cli`.

- [`abi`](#abi)
  - [`abi:add`](#abiadd)
  - [`abi:events`](#abievents)
  - [`abi:list`](#abilist)
  - [`abi:methods`](#abimethods)
  - [`abi:remove`](#abiremove)
  - [`abi:show`](#abishow)
  - [`abi:update`](#abiupdate)
- [`address`](#address)
  - [`address:add`](#addressadd)
  - [`address:balance`](#addressbalance)
  - [`address:list`](#addresslist)
  - [`address:random`](#addressrandom)
  - [`address:remove`](#addressremove)
  - [`address:show`](#addressshow)
- [`block`](#block)
  - [`block:get`](#blockget)
  - [`block:number`](#blocknumber)
- [`contract`](#contract)
  - [`contract:address`](#contractaddress)
  - [`contract:call`](#contractcall)
  - [`contract:deploy`](#contractdeploy)
- [`convert`](#convert)
- [`event`](#event)
  - [`event:get`](#eventget)
  - [`event:watch`](#eventwatch)
- [`method`](#method)
  - [`method:decode`](#methoddecode)
  - [`method:encode`](#methodencode)
  - [`method:hash`](#methodhash)
  - [`method:search`](#methodsearch)
- [`network`](#network)
  - [`network:add`](#networkadd)
  - [`network:list`](#networklist)
  - [`network:remove`](#networkremove)
  - [`network:update`](#networkupdate)
- [`repl`](#repl)
- [`transaction`](#transaction)
  - [`transaction:get`](#transactionget)
  - [`transaction:nop`](#transactionnop)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->



## `abi`

Manage known ABIs and obtain their methods and events.

### `abi:add`

Add a known ABI.

Examples:
- `eth abi:add erc777 ./path/to/erc777.json`

### `abi:events`

Show the list of events in the given ABI.

Examples:
- `eth abi:events erc20`

### `abi:list`

Display the list of known ABIs.

Examples:
- `eth abi:list`

### `abi:methods`

Show the list of methods in the given ABI.

Examples:
- `eth abi:methods ../contracts/proxy.abi`
- `eth abi:methods erc20`

### `abi:remove`

Remove a known ABI.

Examples:
- `eth abi:rm erc777`

### `abi:show`

Display a known ABI

Examples:
- `eth abi:show ERC20`
- `eth abi:show ERC721`

### `abi:update`

Update a known ABI.

Examples:
- `eth abi:update erc777 ./path/to/erc777.json`

## `address`

Manage known addresses, generate random accounts, get balances.

### `address:add`

Add a known address.

Examples:
- `eth address:add ganache 0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d`
- `eth address:add dai 0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359 -n 1`

### `address:balance`

Get the balance of the given address.

Examples:
- `eth address:balance 0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1`

### `address:list`

Display the list of known addresses.

Examples:
- `eth address:list`

### `address:random`

Generate a random Ethereum address with its private key.

Examples:
- `eth address:random`
- `eth address:random 3`
- `eth address:random --prefix aa`

### `address:remove`

Remove a known address.

Examples:
- `eth address:rm ganache`

### `address:show`

Display a known address.

Examples:
- `eth address:get ganache`

## `block`

Get the latest block number of a network or fetch a specific block.

### `block:get`

Get the block object for a given block number.

Examples:
- `eth block:get --mainnet 12345`

### `block:number`

Get the block number of the chosen network.

Examples:
- `eth block:number --rinkeby`
- `eth block:number --network 'https://dai.poa.network'`

## `contract`

Deploy contracts or predict their addresses.

### `contract:address`

Get the address for a contract created from the given account.

Examples:
- `eth contract:address 0x92970dbD5C0Ee6b439422bFd7cD71e1DDA921A03`
- `eth contract:address 0x92970dbD5C0Ee6b439422bFd7cD71e1DDA921A03 --nonce 5`

### `contract:call`

Call a method in the given contract. Specify a private key to send a transaction with the call.

Examples:
- `eth contract:call --rinkeby erc20@0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea 'totalSupply()'`

### `contract:deploy`

Deploy contract with the given binary.

Examples:
- `eth contract:deploy --ropsten --pk 3daa79a26454a5528a3523f9e6345efdbd636e63f8c24a835204e6ccb5c88f9e ./contracts/proxy.bin`
- `eth contract:deploy --pk knownPK --abi erc20 --args ["MYTKN", 18] ./contracts/erc20.bin`

## `convert`

Convert from eth to wei, wei to eth, etc.

Examples:
- `eth convert 1000000000000000000`
- `eth convert -f eth -t wei 1`
- `echo 1000000000000000000 | eth convert`

## `event`

Get past events and watch for new ones.

### `event:get`

Get the events in the given block range.

Examples:
- `eth event:get --mainnet erc20@0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359 Transfer --from 1`
- `eth event:get --mainnet erc20@0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359 Transfer --from 1 --json`

### `event:watch`

Emit new events from the given type in the given contract.

Examples:
- `eth event:get --mainnet erc20@0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359 Transfer`
- `eth event:get --mainnet erc20@0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359 Transfer --json`

## `method`

Encode and decode methods, search by signature, etc.

### `method:decode`

Decode the arguments of the given transaction data for the given function signature.

Examples:
- `eth method:decode 'transfer(address,uint256)' '0xa9059cbb000000000000000000000000697dB915674bAc602F4d6fAfA31c0e45f386416E00000000000000000000000000000000000000000000000000000004ff043b9e'`

### `method:encode`

Encode the ABI for the method <methodCall> and print the ABI byte code.

Examples:
- `eth method:encode --sokol ./test/files/contracts/Proxy.abi 'updateAppInstance()'`

### `method:hash`

Get the hash of the given method.

Examples:
- `eth method:hash 'transfer(address,uint256)'`

### `method:search`

Search the given hashed method signature using the 4byte.directory API

Examples:
- `eth method:search a9059cbb`

## `network`

Manage known networks.

### `network:add`

Add a known network.

Examples:
- `eth network:add rsk --url https://public-node.rsk.co --id 30 --label RSK`

### `network:list`

Show information for each known network.

Examples:
- `eth network:list --display json`
- `eth networks`

### `network:remove`

Remove a known network.

Examples:
- `eth network:remove rsk`

### `network:update`

Update a known network.

Examples:
- `eth network:update rsk --id 30`

## `repl`

Start a REPL that connects to an RPC node ('localhost:8545' by default).

The started REPL exposes a `web3` object that you can use to interact with the
node. There's also an `eth` object to save you from typing `web3.eth`.

You can also indicate some contracts to load in the REPL; see the examples to
learn how to do this.

Examples:
- `eth repl`
- `eth repl --mainnet`
- `eth repl --url=http://localhost:7545`
- `eth repl ./abis/myContract.json@0xaD2FA57bd95A3dfF0e1728686997F6f2fE67F6f9`
- `eth repl erc20@0x34ee482D419229dAad23f27C44B82075B9418D31 erc721@0xcba140186Fa0436e5155fF6DC909F22Ec4648b12`

## `transaction`

Get information about mined transactions or create empty transaction.

### `transaction:get`

Print the transaction object for the given transaction hash.

Examples:
- `eth transaction:get --mainnet 0xc83836f1b3acac94a31de8e24c913aceaa9ebc51c93cd374429590596091584a`
- `eth transaction:get --ropsten 0xc83836f1b3acac94a31de8e24c913aceaa9ebc51c93cd374429590596091584a`
- `eth transaction:get --url= http://localhost:8545 0xc83836f1b3acac94a31de8e24c913aceaa9ebc51c93cd374429590596091584a`

### `transaction:nop`

Generates a transaction that does nothing with the given private key.

Examples:
- `eth transaction:nop --pk 3daa79a26454a5528a3523f9e6345efdbd636e63f8c24a835204e6ccb5c88f9e`
- `ETH_CLI_PRIVATE_KEY=3daa79a26454a5528a3523f9e6345efdbd636e63f8c24a835204e6ccb5c88f9e eth transaction:nop`

