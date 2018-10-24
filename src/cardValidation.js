const validationError = reason=>({
  valid: false,
  reason: reason
})

const validationSuccess = ()=>({
  valid: true,
})


module.exports = {
  validateCardNumber: num=> {
    if (typeof num !== 'number') return validationError('Not a number')
    if (num.toString().length===0) return validationError('Too short')
    if (num.toString().length>19) return validationError('Too long')
    return validationSuccess()
  },

  validateCardAmount: amount=> {
    if (typeof amount !== 'string') return validationError('Not a string')
    return validationSuccess()
  },

  validateCardName: name=> {
    if (typeof name !== 'string') return validationError('Not a string')
    return validationSuccess()
  },
}