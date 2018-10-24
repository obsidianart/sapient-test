const validationError = reason=>({
  valid: false,
  reason: reason
})

const validationSuccess = ()=>({
  valid: true,
})

// For a detailed description of luhn 10 see https://en.wikipedia.org/wiki/Luhn_algorithm or https://www.geeksforgeeks.org/luhn-algorithm/
const isLuhn10 = (num) => {
  // It might be worth splitting it in steps and testing separetely but, well
  // I wouldn't write a common algo by hand anyway...

  //Step 1 – Starting from the rightmost digit double the value of every second digit
  const result = num
    .toString()
    .split('')
    .reverse()
    .map((x,index)=>{
      const num = parseInt(x)

      // double the value of every second digit
      const product = index%2 ? num*2 : num
      
      // Step 2 – If doubling of a number results in a two digits number i.e greater than 9(e.g., 6 × 2 = 12), then add the digits of the product (e.g., 12: 1 + 2 = 3, 15: 1 + 5 = 6), to get a single digit number.
      const is2Digits = product >= 10
      if (is2Digits) {
        return product
          .toString()
          .split('')
          .reduce((a,b)=>parseInt(a)+parseInt(b))
      }
      return product
    })
    // Step 3 – Now take the sum of all the digits.
    .reduce((acc, x)=>(acc+x),0)

  // Step 4 – If the total modulo 10 is equal to 0 (if the total ends in zero) then the number is valid according to the Luhn formula; else it is not valid.
  return result%10 === 0
}


module.exports = {
  validateCardNumber: num=> {
    if (typeof num !== 'number') return validationError('Not a number')
    if (num.toString().length===0) return validationError('Too short')
    if (num.toString().length>19) return validationError('Too long')
    if (!isLuhn10(num)) return validationError('Not luhn 10')
    
    return validationSuccess()
  },

  validateCardAmount: amount=> {
    if (typeof amount !== 'string') return validationError('Not a string')
    if (! /^£[0-9]*\.?[0-9]{0,2}$/.test(amount)) return validationError('Not a string')
    return validationSuccess()
  },

  validateCardName: name=> {
    if (typeof name !== 'string') return validationError('Not a string')
    return validationSuccess()
  },
}