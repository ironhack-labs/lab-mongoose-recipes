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
    // Run your code here, after you have insured that the connection was made
  })

  Recipe.create({ title: "Feijoada", level: "UltraPro Chef", ingredients: ["rice", "chouriço", "morcela", "farinheira", "pork meat", "Masa"], cuisine: "Portugal", dishType: "dinner", image: "https://honest-food.net/wp-content/uploads/2013/12/portuguese-feijoada-320x320.jpg", duration: 120, creator: "Pedro" })
  .then((recipe) => console.log(`Saved Recipe ${recipe}`))

  .then(() => Recipe.insertMany(data))
      .then((dataRecipe) =>
        dataRecipe.forEach((recipes) => {
          console.log("Create Recipes:", recipes.title);
        })
      )

      Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" }, 
      { duration: 100 }, 
      { new: true })
      .then((recipe) => console.log("Update recipe",recipe))
      })
      })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
