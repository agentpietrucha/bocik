const random = array => {
  return array[Math.floor(Math.random() * array.length)];
}
const getGreetings = () => {
  const answers = [
    'Hello! How can I help you?',
    'Hey, nice to see you, let me help you',
    'Yo ;) how can I help you',
    'Welcome back! What di you need?',
    'Hi, how can I help you?',
    'Hey, what do you need?',
  ]
  return random(answers)
}
module.exports = getGreetings
