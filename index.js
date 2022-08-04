const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')


app.use(express.json())
app.use(cors())
app.use(express.static('build')) 
morgan.token('body', function (req, res) {
  return JSON.stringify(req.body)
})

// app.use(morgan(':method :url :response-time :body'))

// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('---')
//   next()
// }
// app.use(requestLogger)

// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' })
// }

// app.use(unknownEndpoint)
// morgan.token('type', function (req, res) { return req.headers['content-type'] })

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/api/info', (request, response) => {
  response.send(`<div>
  <p>Phonebook has info of ${persons.length} people</p>
  </h1>${new Date()}</h1>
  </div>`)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if(person) {
    response.json(person)
  } else {
    response.status(404).end()
  }  
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if(!body.name || !body.number) {
    return response.status(400).json({
      error: 'name and number are required'
    })
  }

  persons.forEach(person => {
    if(person.name === body.name) {
      return response.status(400).json({
        error: 'The contact is already in phonebook'
      })
    }
  })
  const person = {
    id: Math.floor(Math.random()*1000),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)
  response.json(person)
})


const PORT = process.env.PORT || 3005
app.listen(PORT)
console.log(`Server Running on port ${PORT}`)