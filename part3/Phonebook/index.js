const express = require("express");
const morgan = require("morgan")
const app = express();

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
  const id = Math.ceil(Math.random() * 1000000);
  if (!request.body.name || !request.body.phone) {
    return response.status(400).json({
      error: "phone or name is missing",
    });
  }

  if (
    persons
      .map((person) => person.name.toLowerCase())
      .includes(request.body.name.toLowerCase())
  ) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    name: request.body.name,
    phone: request.body.phone,
    id: id,
  };
  persons = persons.concat(person);
  response.json(person);
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
