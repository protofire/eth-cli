# eth-cli

A collection of CLI tools to help with ethereum learning and development.

Some things that can be done with it:

- Get the hash for a given method signature:

  ```
  $ eth method 'transfer(address,uint256)'
  a9059cbb
  ```
- Get the address where a contract will be deployed, given the address of the account that will create it and its nonce:

  ```
  $ eth contract-address 0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1 5
  0xd833215cbcc3f914bd1c9ece3ee7bf8b14f841bb
  ```
- Get the transaction object for a given transaction hash (using the node running in `localhost:8545`):

  ```
  $ eth tx 0x11aaa599233219609a6d40f85f9b3e10aacdd84c3f7826081bcec939ab227434
  {
    "blockHash": "0x2302dff09eed5155076defa755a47759af978343893bd19db66b8acce0fba255",
    "blockNumber": 1000000,
    ...
    "v": "0x2b",
    "r": "0xe094dc11101ba5a659c5cbf5b9759efed7e774be7022c3bbde0edbd82d48e629",
    "s": "0x1b1aabe3fa700be3bcbcd99e7e6fc6cab37dd63a8240f3f62ce50c848fa00cea"
  }
  ```
- Start a REPL that connects to the node running in `localhost:8545`, exposes the `web3` and `eth` objects, and resolves promises automatically:

  ```
  $ eth repl
  > eth.getTransactionCount('0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1')
  331
  ```
- Start a REPL that connects to the node running in `localhost:8545` and loads a contract given its ABI and address. The contract is exposed as `Contract` and promises are resolved automatically:

  ```
  $ eth load-contract path/to/contract.abi 0xd833215cbcc3f914bd1c9ece3ee7bf8b14f841bb
  > Contract.methods.add(2, 2).call()
  4
  ```
  
  ## Installation
  
  `npm install -g eth-cli`
