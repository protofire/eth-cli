import Web3 from 'web3'

export const getTransaction = function(transactionHash: string, url: string) {
  if (!transactionHash) {
    throw new Error('[getTransactionObject] txHash required')
  }

  if (!url) {
    throw new Error('[getTransactionObject] URL required')
  }

  // Connect web3
  const web3 = new Web3(new Web3.providers.HttpProvider(url))

  return web3.eth.getTransaction(transactionHash)
}

export const getReceipt = function(transactionHash: string, url: string) {
  if (!transactionHash) {
    throw new Error('[getTransactionObject] txHash required')
  }

  if (!url) {
    throw new Error('[getTransactionObject] URL required')
  }
  // Connect web3
  const web3 = new Web3(new Web3.providers.HttpProvider(url))

  return web3.eth.getTransactionReceipt(transactionHash)
}
