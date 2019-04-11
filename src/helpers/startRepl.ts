import Web3 from 'web3'

import { replStarter } from './replStarter'

export function startRepl(url: string) {
  if (!url) {
    throw new Error('[startRepl] URL require')
  }

  // Connect web3
  const web3 = new Web3(new Web3.providers.HttpProvider(url))

  // Start REPL
  replStarter({
    web3,
    eth: web3.eth
  })
}
