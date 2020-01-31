const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

const userSpecs = {
  title: "Pain aux chocolat",
  level: "UltraPro Chef",
  ingredients: ["farine", "sel", "sucre"],
  cuisine: "Yalready",
  dishType: "Dessert",
  duration: 120,
  creator: "Cecile"
}

Recipe.create(userSpecs)
  .then(newUser => {
    console.log('1 - CREATE PROMISE The user is saved and its value is: ', newUser)
    Recipe.insertMany(data)
      .then(savedData => {
        console.log(' 2 - INSERT PROMISE The user is saved and its value is: ', savedData)
        Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
          .then(success => {
            console.log("3 - UPDATE PROMISE we did it")
            Recipe.deleteOne({ title: "Carrot Cake" })
              .then(success => {
                console.log("4 - DELETE PROMISE succes")
                mongoose.connection.close().then(() => {
                  console.log(" 5 - CLOSE PROMISE closing db");
                }).catch(err => console.log("SERVER STILL OPEN"))
              }
              )
              .catch(err => console.log("Couldnt delete for some reason"))
          })
          .catch(err => console.log(err)
          )
      })
      .catch(savedData => console.log("Couldnt create user: ", savedData))
  })
  .catch(newUser => console.log("Couldnt create user: ", newUser))









