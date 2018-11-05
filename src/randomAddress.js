const { randomBytes } = require('crypto')
const wallet = new (require('web3-eth-accounts'))().wallet

module.exports = function(amount, prefix) {
  return new Promise(resolve => {
    const accounts = []
    let accAmount = parseInt(amount)

    if (isNaN(accAmount) || accAmount === 0) {
      throw new Error('[random-address] ajj must be a integer number and greater than 0')
    }

    if (prefix === '' || prefix === undefined) {
      for (let i = 0; i < accAmount; i++) {
        const { address, privateKey } = wallet.create(1, randomBytes(32))[0]
        wallet.clear()
        accounts.push({ address, privateKey })
      }
    } else {
      let acc = wallet.create(1, randomBytes(32))[0]

      while (accAmount > 0) {
        if (acc.address.slice(2, 2 + prefix.length) === prefix) {
          const { address, privateKey } = acc
          accounts.push({ address, privateKey })
          accAmount--
        }

        wallet.clear()
        acc = wallet.create(1, randomBytes(32))[0]
      }
    }

    resolve(accounts)
  })
}
