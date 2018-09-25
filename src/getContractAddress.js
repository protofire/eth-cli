const sha3 = require('ethereumjs-util').sha3
const rlp = require('rlp')
const { add0x } = require('./utils')

module.exports = function(_address, _nonce) {
  if (!_address) {
    throw new Error('address is required')
  }

  const address = add0x(_address)
  const nonce = Number(_nonce || 0)

  const contractAddress = sha3(rlp.encode([address, nonce]))
    .toString('hex')
    .slice(24)

  return add0x(contractAddress)
}
