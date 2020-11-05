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
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const recipe1 = {
      title: "Asian Glazed Chicken Thighs NO HONEY",
      level: "Amateur Chef",
      ingredients: [
        "1/2 cup rice vinegar",
        "1/3 cup soy sauce (such as Silver Swan®)",
        "1/4 cup Asian (toasted) sesame oil",
        "3 tablespoons Asian chili garlic sauce",
        "3 tablespoons minced garlic",
        "salt to taste",
        "8 skinless, boneless chicken thighs"
      ],
      cuisine: "Asian",
      dishType: "main_course",
      duration: "35",
      creator: "Chef LePapu"
    }

    //Iteration 2 - Create a recipe
    // Recipe.create(recipe1).then(() => console.log(`${recipe1.title} added to db!`))

    Recipe.insertMany(data).then((recipesArray => {
      recipesArray.forEach(recipe => {
        console.log(`The following recpie was inserted: ${recipe.title}`)
      })
      Recipe.findOneAndUpdate({
        title: "Asian Glazed Chicken Thighs"
      }, {
        level: "Easy Peasy"
      }, {
        new: true
      }).then((e) => {
        console.log("update :D " + e.title)
      })

      Recipe.findOneAndDelete({
        title: "Orange and Milk-Braised Pork Carnitas"
      }).then((e) => {
        console.log("deletion:D " + e.title)
      })

      Recipe.find().then((e) => console.log("SELECT * FROM ... AFTER the deletion " + e)).then(() => {
        console.log("disconnecting from db..")
        mongoose.disconnect()
      })

    }))
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  })