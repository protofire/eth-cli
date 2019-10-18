import { keccak } from 'ethereumjs-util'

import { ABIInput } from '../types'

import { extractMethodsAndEventsFromABI, loadABI } from './utils'

function getMethodsAndEvents(abiPath: string) {
  let { abi } = loadABI(abiPath)

  const methods = extractMethodsAndEventsFromABI(abi).map(({ name, inputs, kind }) => {
    const params = inputs.map((x: ABIInput) => x.type).join(',')
    const signature = `${name}(${params})`
    const signatureHash = keccak(signature)
      .toString('hex')
      .slice(0, 8)

    return { signature, signatureHash, kind }
  })

  return methods
}

export function getMethods(abiPath: string) {
  return getMethodsAndEvents(abiPath).filter(x => x.kind === 'function')
}

export function getEvents(abiPath: string) {
  return getMethodsAndEvents(abiPath).filter(x => x.kind === 'event')
}
