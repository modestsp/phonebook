const mongoose = require('mongoose')


// if (process.argv.length > 3 && process.argv.length < 5) {
//   console.log('Please provide the password, name and number as arguments: node mongo.js <password> <name> <number>')
//   process.exit(1)
// }

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://dbtest:${password}@cluster0.ybeon0z.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 3) { 
mongoose
.connect(url)
.then((result) => {
  console.log('connected')
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
})
} else {
  mongoose
  .connect(url)
  .then(() => {
    console.log('connected')

    const person = new Person({
      name: name,
      number: number
    })

    return person.save()
  })
  .then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    return mongoose.connection.close()
  })
  .catch(err => console.log('error', err))
}

