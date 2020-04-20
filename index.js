const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';


// PROBLEM WITH THIS METHOD: TRYING TO RENDER A VIEW: SCOPE OF THE DATABASE RESULT IS IN THE THEN BLOCK, SO
// I CANNOT ACCESS THE SCOPE OF THE PREVIOUS THEN BLOCK

// Connection to the database "recipe-app"

mongoose                      // to connect to the database
  .connect(MONGODB_URI, {     // variable of the address of the database, we connect to that path
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
    // Iteration 2 - Creating a new recipe
  })
  .then(() => {             // First operation: creating the newRecipe using a promise (then + catch)
    const newRecipe = {
      title:"my new recipe",
      level:"beginner",
      ingredients:["1 bar of chocolate","1 banana"],
      cuisine:"French",
      dishType:"dessert",
      duration:2,
      creator:"Chef Sébastien",
    }
    return Recipe.create(newRecipe)
  })
  .then((dbResultCreatePromise) => {
    console.log(dbResultCreatePromise)
    return Recipe.insertMany(data)
  })
  .then((dbResultInsertManyPromises) => {
    const onlyTitlesArray = dbResultInsertManyPromises.map((data) => {
    return data.title;
    })
    console.log("insertMany was made", onlyTitlesArray)
    return Recipe.findOneAndUpdate( {title:'Rigatoni alla Genovese'}, {duration:100}, {new:true} );
  })
  .then((dbResultUpdate) => {
    console.log(dbResultUpdate)
    return Recipe.deleteOne( {title:'Carrot Cake'} );
  })
  .then((dbResDelete) => {
    console.log(dbResDelete)
    return mongoose.connection.close();
  })
  .then(() => {
    console.log('Database closed!');
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });




// Meilleure méthode tous les .then() suivis de tous les .catch()
// Ou bien async await



  // WITH ASYNC AWAIT

async function seeds() {
  try {                               // TRY AND CATCH
  const self = await mongoose
    .connect(MONGODB_URI, {     // variable of the address of the database, we connect to that path
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log(`Connected to the database: "${self.connection.name}"`);
    
  await self.connection.dropDatabase();
  const newRecipe = {
    title: "my new recipe",
    level: "beginner",
    ingredients: ["1 bar of chocolate", "1 banana"],
    cuisine: "French",
    dishType: "dessert",
    duration: 2,
    creator: "Chef Sébastien",
  }
  const createRecipe = await Recipe.create(newRecipe)

  console.log(dbResultCreatePromise)
  const createdRecipes = await Recipe.insertMany(data)

  const updatedRecipes = await Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true });

  const deletedRecipe = await Recipe.deleteOne({ title: 'Carrot Cake' });

} catch (error) {
    console.log(error);
  }

}

seeds();




