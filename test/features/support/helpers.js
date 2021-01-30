
async function howItShouldWork (element1, element2, element3) {
  // This function will check if 3 elements have a match and return a string with a match description (just to make things more clear and readable)
  if (element1 === element2 && element2 === element3) {
    // console.log(`ALL MATCHES: ELEMENT1: ${element1} ELEMENT2: ${element2} ELEMENT3: ${element3}`) // Uncomment to log the actual element values in the console
    return 'ALL MATCHES'
  } else if (element1 === element2 || element2 === element3 || element1 === element3) {
    // console.log(`TWO MATCHES: ELEMENT1: ${element1} ELEMENT2: ${element2} ELEMENT3: ${element3}`) // Uncomment to log the actual element values in the console
    return 'TWO MATCHES'
  } else {
    return 'NO MATCHES'
  }
}
module.exports = { howItShouldWork }
