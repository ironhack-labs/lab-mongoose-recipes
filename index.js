const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    Recipe.create({
        title: "Cachopo",
        cuisine: "Mordor"
      })
      .then((recipe) =>
        console.log(recipe.title))
      .then(() => {
        Recipe.create(data)
          .then((recipe) => {
            recipe.forEach((element) => console.log(`${element.title} added`))
          })
      .then(() => {
            Recipe.updateOne({
                title: "Rigatoni alla Genovese"
              }, {
                duration: 100
              })
              .then(recipe => {
                console.log(`Riggatoni duration is updated to ${recipe.duration}`)
              })
          })
      .then(() => {
            Recipe.deleteOne({
                title: "Carrot Cake"
              })
              .then(() => {
                console.log("Recipe deleted")


                mongoose.connection.close()
              })
          })
      })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });