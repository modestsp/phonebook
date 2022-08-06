require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

// Express middleware
app.use(express.json())
app.use(cors())
app.use(express.static('build')) 
// Morgan middleware
morgan.token('body', function (req, res) {
  return JSON.stringify(req.body)
})


// Fetching all persons
app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})


// Fetching individual person
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

// Creating a new contact
app.post('/api/persons', (request, response) => {
  const body = request.body

  if(!body.name || !body.number) {
    return response.status(400).json({
      error: 'name and number are required'
    })
  }
  // Repeated name
  // persons.forEach(person => {
  //   if(person.name === body.name) {
  //     return response.status(400).json({
  //       error: 'The contact is already in phonebook'
  //     })
  //   }
  // })

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})


const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server Running on port ${PORT}`)