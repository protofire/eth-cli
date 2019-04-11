import { keccak } from 'ethereumjs-util'
import * as rlp from 'rlp'

import { add0x } from './utils'

export function getContractAddress(_address: string, _nonce: string) {
  if (!_address) {
    throw new Error('address is required')
  }

  const address = add0x(_address)
  const nonce = Number(_nonce || 0)

  const contractAddress = keccak(rlp.encode([address, nonce]))
    .toString('hex')
    .slice(24)

  return add0x(contractAddress)
}
