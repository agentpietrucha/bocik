const random = array => {
  return array[Math.floor(Math.random() * array.length)];
}

const getThanks = () => {
  const answers = [
    'You are welcome',
    'No problem',
    'My pleasure',
    'Thank you!',
  ]
  return random(answers)
}
module.exports = getThanks
