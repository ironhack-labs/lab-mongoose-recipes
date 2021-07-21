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

    // Run your code here, after you have insured that the connection was made
    const newRecipe = {
    title: "Lumpiang Shanghai",
    level: "Easy Peasy",
    ingredients: ["1 pack egg wrapper",
                   "250 grams minced pork",
                   "50 grams minced carrots",
                   "70 grams minced onions",
                   "5 grams garlic powder"],
    cuisine: "Filipino",
    dishType: "snack",
    image: "https://images.media-allrecipes.com/images/75131.jpg",
    duration: 60,
    creator: "me",
    created: +new Date(),

};


  Recipe.insertMany(data)
    .then((addedRecipes) => {
      console.log("recipes added!")
      console.log(addedRecipes);

      Recipe.findOneAndUpdate(
  { title: 'Rigatoni alla Genovese' },
  { duration: 100 }
)
  .then((updatedRecipe) => {
    console.log("Updated recipe ===>", updatedRecipe);
  })
  .catch((error) => {
    console.log(error);
  })
  })

  Recipe.findOneAndDelete( { title: 'Carrot Cake' })
    .then(() => {
      console.log("Recipe deleted!");


    })

  .catch(error => {
  console.log('recipes not added', error);
  })




Recipe.create(newRecipe)

.then((createdDocument) => {
  console.log("recipe updated!");
  console.log(createdDocument);
})

  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });




  
});
  
  
mongoose.disconnect()