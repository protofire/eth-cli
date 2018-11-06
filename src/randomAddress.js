const { generateAccount, range } = require('./utils')

module.exports = function(amount, prefix) {
  if (isNaN(amount) || parseInt(amount) === 0) {
    throw new Error('[random-address] must be an integer number and greater than 0')
  }

  const findAccount = generateAccount(prefix)

  return range(amount)
    .map(() => findAccount())
    .map(({ address, privateKey }) => ({ address, privateKey }))
}
