const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

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
    
    //CREAR NUEVO ELEMENTO

      const receta1 = new Recipe({
        title: "Receta de prueba 1",
        level: "Easy Peasy",
        ingredients: ["tomate", "aceite", "pan"],
        cuisine: "Catalan",
        dishType: "breakfast",
        duration: 5,
        creator: "Natalia"

      });

      receta1
        .save()
        .then(newRecipe => console.log("A new recipe is created:", newRecipe.title))
        .catch(err => console.log(`Error while creating a new recipe: ${err}`));

   
    //INSERT MANY

    const recipesArr = [
      {
        title: "Receta de prueba 2",
        level: "Easy Peasy",
        ingredients: ["tomate", "aceite", "pan"],
        cuisine: "Catalan",
        dishType: "breakfast",
        duration: 5,
        creator: "Natalia"

      },
      {
        title: "Receta de prueba 3",
        level: "Easy Peasy",
        ingredients: ["tomate", "aceite", "pan"],
        cuisine: "Catalan",
        dishType: "breakfast",
        duration: 5,
        creator: "Natalia"

      },
      {
        title: "Receta de prueba 4",
        level: "Easy Peasy",
        ingredients: ["tomate", "aceite", "pan"],
        cuisine: "Catalan",
        dishType: "breakfast",
        duration: 5,
        creator: "Natalia"

      }
    ];

    Recipe
        .insertMany(recipesArr)
        .then(newRecipes => {
          newRecipes.forEach(recipe => {
            console.log("A new recipe is created:", recipe.title);
          });
        })
        .catch(err => console.log(`Error while creating a new recipe: ${err}`));


  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
