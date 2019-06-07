import { keccak } from 'ethereumjs-util'

import { ABIInput, ABIItem } from '../types'

import { extractMethodObjectsFromABI, loadABI } from './utils'

export function getMethods(abiPath: string) {
  let abi = loadABI(abiPath)

  const methods = extractMethodObjectsFromABI(abi).map(({ name, inputs }: ABIItem) => {
    const params = inputs.map((x: ABIInput) => x.type).join(',')
    const signature = `${name}(${params})`
    const signatureHash = keccak(signature)
      .toString('hex')
      .slice(0, 8)

    return { signature, signatureHash }
  })

  return methods
}
