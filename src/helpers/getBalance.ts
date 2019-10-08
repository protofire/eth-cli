import Web3 from 'web3'

export const getBalance = function(address: string, url: string) {
  // Connect web3
  const web3 = new Web3(new Web3.providers.HttpProvider(url))

  return web3.eth.getBalance(address)
}
