const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2];
const name= process.argv[3];
const phone = process.argv[4];
const url =
  `mongodb+srv://amanagent98:${password}@cluster0.vmwqufu.mongodb.net/Phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  name: String,
  phone: String,
})

const Person = mongoose.model('Person', noteSchema)
if(process.argv.length==3)
{
    Person.find({}).then(result => {
        console.log("Phonebook")
        result.forEach(person => {
          console.log(`${person.name} - ${person.phone}`)
        })
        mongoose.connection.close()
      })
      
}
else
{
const person = new Person({
 name,phone
})

person.save().then(result => {
  console.log(`added ${person.name} number ${person.phone} to phonebook`)
  mongoose.connection.close()
})
}
