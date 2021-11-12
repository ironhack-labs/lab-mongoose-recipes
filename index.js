const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
const url = "https://images.media-allrecipes.com/images/75131.jpg";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    return mongoose.connection.db.dropDatabase(); 
    // Before adding any recipes to the database, let's remove all existing ones
    //return Recipe.deleteMany()
  })
  .then(() => {
    const recipe1 = {
      title: "Orange and Milk-Braised Pork Carnitas",
      level: "UltraPro Chef",
      ingredients: [
        "3 1/2 pounds boneless pork shoulder, cut into large pieces",
        "1 tablespoon freshly ground black pepper",
        "1 tablespoon kosher salt, or more to taste",
        "2 tablespoons vegetable oil",
        "2 bay leaves",
        "2 teaspoons ground cumin",
        "1 teaspoon dried oregano",
        "1/4 teaspoon cayenne pepper",
        "1 orange, juiced and zested"
      ],
      cuisine: "American",
      dishType: "main_course",
      image: "url",
      duration: 160,
      creator: "Chef John"
    };
    return Recipe.create(recipe1);
  })
  .then((createdRecipe) => {
    console.log('recipe', createdRecipe);
    const recCreate = Recipe.insertMany(data);
    return recCreate;
  })
  .then((recCreate) => {
    console.log('recCreate', recCreate);
    const recUpdate = Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 }
    );
    return recUpdate;
  })
  .then((recUpdate) => {
    console.log("updatedRecipe", recUpdate);
    const recDeleted = Recipe.deleteOne({ name: 'Carrot Cake' });
    return recDeleted;
  })
  .then((recDeleted) => {
    console.log('recDeleted', recDeleted);
    return mongoose.connection.close();    //here we can put finally instead of then
})
.then(() => {
  console.log('Connection closed!');
})
  .catch(error => {
    console.error('Error connecting to the database', error);
  });