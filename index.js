const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const newRecipe = {
  title: "Pizza",
  level: "Easy Peasy",
  ingredients: ['flour', 'water', 'eggs'],
  cuisine: "Italian",
  dishType: 'main_course',
  duration: 45,
  creator: "Ivana"
}

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
    Recipe.create(newRecipe)
      .then((recipe) => console.log("New recipe created", recipe.title))
      .then(() => Recipe.insertMany(data))
      .then((newRecipes) => 
        newRecipes.forEach(recipe => {
          console.log('Recipe title:', recipe.title)
        })
      )
      .then(() => Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }))
      .then((recipe) =>  console.log("Update successful!"))
      .then(() => Recipe.deleteOne({ title: "Carrot Cake" }))
      .then(() => console.log("Successfully removed!"))
      .then(() => mongoose.connection.close())
      .then(() => console.log('Database closed.'))
      .catch(() => console.log('Someething went wrong.'))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });




