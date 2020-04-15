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
    
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


  // CRUD - Create One
Recipe.create({
  title: "Cocido Madrileño",
  level: "Easy Peasy",
  ingredients: ["Garbanzos, Morcilla, Tocino, Hueso de rodilal de ternera, huesos de espinazo de cerdo salado", "Chorizo fresco", "Fideos", "Pollo", "Patatas", "Zanahoria", "Cebolla"],
  cuisine: "Spanish",
  dishType: "main_course",
  image: "https://www.laespanolaaceites.com/wp-content/uploads/2019/06/cocido-madrileno.jpg",
  duration: 120,
  creator: "Madrileños",
  created: new Date
})
  .then(newRecipeCreated => {
    console.log("1 - New Recipe Created: ", newRecipeCreated)
    // CRUD - Create Many
    return Recipe.create(data)
  })
  .then(newRecipesCreated => {
    console.log("2 - New Recipes Created Array: ", newRecipesCreated)
    // CRUD - Update
    return Recipe.update({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
  })
  .then(updatedInfo => {
    console.log("3 - New Updated Info: ", updatedInfo)
    // CRUD - Delete
    return Recipe.deleteOne({ title: "Carrot Cake" })
  })
  .then(deletedInfo => { console.log("4 - The Following Info has been deleted: ", deletedInfo) })
  .then(() => {
    mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    })

  })
  .catch(err => console.log("Can't process request. Error: ", err))
