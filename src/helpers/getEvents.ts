import Web3 from 'web3'

import { getAddress } from './config'
import { extractMethodsAndEventsFromABI, loadABI } from './utils'

export async function getEvents(
  abi: any,
  eventName: string,
  name: string,
  url: string,
  { from, to }: any,
) {
  const matchingEvents = extractMethodsAndEventsFromABI(abi).filter(x => x.name === eventName)

  if (!matchingEvents.length) {
    throw new Error('[getEvents] event specified does not exist in the ABI provided')
  }

  const eventAbi = matchingEvents[0]

  const web3 = new Web3(new Web3.providers.HttpProvider(url))
  const networkId = await web3.eth.net.getId()

  const address = getAddress(name, String(networkId))

  const contract = new web3.eth.Contract(abi, address)
  const events = await contract.getPastEvents(eventName, { fromBlock: from, toBlock: to })

  const parsedEvents = events.map(event => {
    const returnValues = eventAbi.inputs.map((x: any, i: number) => event.returnValues[i]).join(',')
    return `${eventAbi.name}(${returnValues})`
  })

  return parsedEvents
}
