const sha3 = require('ethereumjs-util').sha3;
const rlp = require('rlp');

module.exports = function(_address, _nonce) {
  if (!_address) {
    throw new Error('address is required');
  }

  const address = normalizeAddress(_address);
  const nonce = Number(_nonce || 0);

  const contractAddress = sha3(rlp.encode([address, nonce])).toString('hex').slice(24);

  return normalizeAddress(contractAddress);
}

function normalizeAddress(address) {
  if (address[0] === '0' && (address[1] === 'x' || address[1] === 'X')) {
    return address;
  }

  return '0x' + address;
}
