const random = array =>{
  return array[Math.floor(Math.random() * array.length)];
}
const getGoodbye = () =>{
  const answers = [
    'Goodbye!',
    'Bye!',
    'See you soon!',
    'See ya!',
    'Hope to see u soon madafaka!',
  ]
  return random(answers)
}
module.exports = getGoodbye
