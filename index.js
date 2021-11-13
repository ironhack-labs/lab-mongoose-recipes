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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    const recipe1= {
    title: "Lasanha", 
    level: "Easy Peasy", 
    ingredients: "pasta",
    cuisine: "italian", 
    dishType: "main_course",
    image: "https://images.media-allrecipes.com/images/75131.jpg", 
    duration: 5, 
    creator: "josé"
  };
  const pr = Recipe.create(recipe1);
    return pr;
})
  .then((createRecipe1) => {
    console.log(createRecipe1)
  })
  .then((updatedRecipe) => {
    //console.log(updatedRecipe.title)
    const allRecipes = Recipe.insertMany(data);
    return allRecipes;
  })
  .then((insertedResults)=> {
    console.log(insertedResults);

    const pr = Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"},
    {duration: 100},{ new:true})
    return pr;
  })
  .then((updatedRecipe) => {
    console.log(updatedRecipe)
    const pr = Recipe.deleteOne({ title: "Carrot Cake"});
    return pr;
  })
  .then((deletedRecipe)=> {
    console.log("deletedRecipe")
  })
  .then((result) => {
    console.log(`result`, result);
    return mongoose.connection.close();
  })
  .then(() => {
    console.log('connection closed!');
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
