const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const Person = require("./mongo.js");
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(morgan(":body"));

app.get("/api/persons", (request, response) => {
  Person.find({}).then((result) => {
    response.json(result);
  });
});

app.post("/api/persons", (request, response) => {
  const person = new Person({
    name: request.body.name,
    phone: request.body.phone,
  });
  person.save().then((result) => {
    console.log(`added ${person.name} number ${person.phone} to phonebook`);
  });
  response.json(person);
});

app.get("/api/persons/:id", (request, response,next) => {
  console.log(request.params.id)
  Person.findById(request.params.id)
    .then((person) => {
      console.log(person)
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error)
      next(error)
    });
});
app.put("/api/persons/:id", (request, response) => {
  const person = {
    name: request.body.name,
    phone: request.body.phone,
  };
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});
app.get("/info", (request, response) => {
  response.end(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`);
});

const PORT = 3001;
app.listen(PORT, (request, response) => {
  console.log(`server running on ${PORT}`);
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);
