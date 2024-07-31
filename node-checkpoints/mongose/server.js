const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

const app = express(); // Initialize Express application

app.get("/",(req,res)=>{
    res.end("hello world")
})
app.listen(5000,(err)=>{
    if (err) console.log(err);
    console.log("server runnig")
})
MONGO_URI="mongodb://localhost:27017"

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define Person Schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

// Define Person Model
const Person = mongoose.model('Person', personSchema);

// Create and Save a Record of a Model
const createPerson = (name, age, favoriteFoods) => {
  const person = new Person({ name, age, favoriteFoods });
  person.save((err, data) => {
    if (err) return console.error('Error saving person:', err);
    console.log('Person saved successfully:', data);
  });
};

// Create Many Records with model.create()
const createManyPeople = (arrayOfPeople) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error('Error creating people:', err);
    console.log('People created successfully:', data);
  });
};

// Use model.find() to Search Your Database
const findPeopleByName = (name) => {
  Person.find({ name }, (err, data) => {
    if (err) return console.error('Error finding people by name:', err);
    console.log('People found by name:', data);
  });
};

// Use model.findOne() to Return a Single Matching Document from Your Database
const findOnePersonByFood = (food) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.error('Error finding person by food:', err);
    console.log('Person found by food:', data);
  });
};

// Use model.findById() to Search Your Database By _id
const findPersonById = (personId) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.error('Error finding person by id:', err);
    console.log('Person found by id:', data);
  });
};

// Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId, foodToAdd) => {
  Person.findById(personId, (err, person) => {
    if (err) return console.error('Error finding person for update:', err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if (err) return console.error('Error saving updated person:', err);
      console.log('Person updated successfully:', updatedPerson);
    });
  });
};

// Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName, newAge) => {
  Person.findOneAndUpdate(
    { name: personName },
    { age: newAge },
    { new: true },
    (err, updatedPerson) => {
      if (err) return console.error('Error updating person:', err);
      console.log('Person updated successfully:', updatedPerson);
    }
  );
};

// Delete One Document Using model.findByIdAndRemove
const removeById = (personId) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) return console.error('Error removing person:', err);
    console.log('Person removed successfully:', removedPerson);
  });
};

// MongoDB and Mongoose - Delete Many Documents with model.remove()
const removeManyPeople = (name) => {
  Person.remove({ name }, (err, result) => {
    if (err) return console.error('Error removing people:', err);
    console.log('People removed successfully:', result);
  });
};

// Chain Search Query Helpers to Narrow Search Results
const findPeopleWhoLikeBurritos = () => {
  Person.find({ favoriteFoods: 'burritos' })
    .sort('name')
    .limit(2)
    .select('-age')
    .exec((err, data) => {
      if (err) return console.error('Error finding people who like burritos:', err);
      console.log('People who like burritos:', data);
    });
};

// Example usage
createPerson('John Doe', 30, ['pizza', 'sushi']);
createManyPeople([{ name: 'Alice', age: 25, favoriteFoods: ['burger', 'pasta'] }, { name: 'Bob', age: 35, favoriteFoods: ['burritos', 'steak'] }]);
findPeopleByName('John Doe');
findOnePersonByFood('pizza');
findPersonById('60a07070a86e4714d8f89eb3');
findEditThenSave('60a07070a86e4714d8f89eb3', 'hamburger');
findAndUpdate('Alice', 20);
removeById('60a07070a86e4714d8f89eb3');
removeManyPeople('Mary');
findPeopleWhoLikeBurritos();
