// **

const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp',
  { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });



//  DELETE COLLECTION
Recipe.deleteMany()
  .then(result => {

    console.log('RESULT => ', result)

    // 1.
    const myRecipe = new Recipe({
      title: "Tortilla francesa",
      level: "UltraPro Chef",
      ingredients: ["Huevo", "Mantequilla", "Sal", "Especias"],
      cuisine: "fuego lento",
      dishType: "Other",
      image: "",
      duration: 10,
      creator: "Adrian",
    })

    myRecipe.save()
      .then(recipe => {
        console.info("### ITERATION 2 ###")
        console.info("Created successfully => " + recipe.title)
        return Recipe.insertMany(data)
      })
      .then(recipes => {
        console.info("### ITERATION 3 ###")
        for (let recipe of recipes) {
          console.info("Created successfully => " + recipe.title)
        }
        // return Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
        return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { $set: { duration: 100 } }, { new: true });
      })
      .then(recipe => {
        console.info("### ITERATION 4 ###")
        console.info(`${recipe.title} duration updated to ${recipe.duration}`)
        // return Recipe.deleteOne({ title: "Carrot Cake" })
        return Recipe.findOneAndRemove({ title: 'Carrot Cake' });
      })
      .then(recipe => {
        console.info("### ITERATION 5 ###")
        console.info(`${recipe.title} deleted successfully!`)
      })
      .catch(error => console.error(error))
      .then(() => {
        console.info("Closing database...")
        return mongoose.connection.close()
      })
      .then(() => console.info('Bye bye!'))
      .catch(error => console.log("Error => " + error))

  })
  .catch(error => console.log('ERROR => ', error))