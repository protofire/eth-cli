const { generateAccount, range } = require('./utils')

module.exports = function(amount, prefix) {
  return new Promise(resolve => {
    if (isNaN(amount) || parseInt(amount) === 0) {
      throw new Error('[random-address] must be an integer number and greater than 0')
    }

    const findAccount = generateAccount(prefix)

    const accounts = range(amount)
      .map(() => findAccount())
      .map(({ address, privateKey }) => ({ address, privateKey }))

    resolve(accounts)
  })
}
