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
    useFindAndModify: false,

  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    updateDatabase();
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });




 async function updateDatabase() {
   try { //everything inside the try catch error
    //  const recipeOne = await Recipe.create({
    //    title: "Asian Glazed Chicken Thighs",
    //    level: "Amateur Chef",
    //    ingredients: [
    //      "1/2 cup rice vinegar",
    //      "5 tablespoons honey",
    //      "1/3 cup soy sauce (such as Silver Swan®)",
    //      "1/4 cup Asian (toasted) sesame oil",
    //      "3 tablespoons Asian chili garlic sauce",
    //      "3 tablespoons minced garlic",
    //      "salt to taste",
    //      "8 skinless, boneless chicken thighs"
    //    ],
    //    cuisine: "Asian",
    //    dishType: "main_course",
    //    image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
    //    duration: 40,
    //    creator: "Chef LePapu"
    //  });
     
    //  console.log('Recipe created', recipeOne.title);

     const insertRecipes = await Recipe.insertMany(data);
     for(let i = 0; i < insertRecipes.length; i++){
    console.log('Recipes inserted', insertRecipes[i].title);
     }
     
     const updatedRecipe = await Recipe.findOneAndUpdate({
       title: 'Rigatoni alla Genovese'
     }, {
       duration: 100
     }, { new:true });
     console.log('Success message', updatedRecipe);

    const deleteRecipe = await Recipe.deleteOne({title: 'Carrot Cake'});
    console.log('Success message');
     

   } catch (e) {
     console.log('error occurred', e);
   } finally {
     mongoose.connection.close(); //closes the connection to the database
     //good practise to close the connection
   }
 }
 



