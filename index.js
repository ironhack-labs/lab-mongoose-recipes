const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()

    .then(() => {
      return Recipe.create(data[0])
       .then((res) => {
         console.log(res.title)
       })
        .catch(error => {
          console.error('Error creating new entry', error);
        })
     })

    .then(() => {
      return Recipe.insertMany(data)
      .then((res) => {
        res.forEach(element => console.log(element.title))
      })
        .catch(error => {
          console.error('Error creating many entries', error);
         })
    })
     
    .then(() => {
      return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese'}, { duration: 100})
      .then(() => {
        console.log("Sucessful update!")
      })
        .catch(error => {
          console.error('Error updating', error);
        })
    })

    .then(() => {
      return Recipe.deleteOne({ title: "Carrot Cake"})
      .catch(error => {
        console.error('Error deleting', error);
      })
     })

  })
  .catch(error => {
    console.error('Error connecting to the database', error);

  })
  .finally(() => {
		mongoose.connection.close()
  })
