const express = require("express");
const morgan = require("morgan")
const cors = require('cors')
const app = express();
app.use(cors())
app.use(express.json());
const Person = require("./mongo.js")
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':body'));


app.get("/api/persons", (request, response) => {
  Person.find({}).then(result => {
      response.json(result);
    })
  })
 

app.post("/api/persons", (request, response) => {

  const person = new Person({
    name: request.body.name,
    phone: request.body.phone,
  });
  person.save().then(result => {
    console.log(`added ${person.name} number ${person.phone} to phonebook`)
  })
  response.json(person)
});
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});
app.get("/info", (request, response) => {
  response.end(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`);
});

const PORT = 3001;
app.listen(PORT,(request,response)=>{
  console.log(`server running on ${PORT}`)
})
