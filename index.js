const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

let testRecipe = {
  title: "Rigatoni alla Genovese",
  level: "Easy Peasy",
  ingredients: [
      "2 pounds red onions, sliced salt to taste",
      "2 (16 ounce) boxes uncooked rigatoni",
      "1 tablespoon chopped fresh marjoram leaves",
      "1 pinch cayenne pepper",
      "2 tablespoons freshly grated Parmigiano-Reggiano cheese"
    ],
  cuisine: "Italian",
  dishType: "main_course",
  image: "https://images.media-allrecipes.com/userphotos/720x405/3489951.jpg",
  duration: 220,
  creator: "Chef Luigi"
};



const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app" // connection takes some time / async function
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return self.connection.dropDatabase();
  })
  // .then(() => {
  //   // return Recipe.create(testRecipe);
    
  // })
  .then((resultFromDB) => {     // or when from DB--> testRecipeFromDB
    console.log("...........")
    console.log(`our new recipe was successfully saved ${resultFromDB.title}..`);
  return Recipe.insertMany(data); 
  })
  .then((resultFromDB) => {
  //  resultFromDB.forEach((element) => {
  //    console.log( `recipe for ${element.title} `)
  return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese" }, {duration: 100}, {new: true})
   })
  .then((resultFromDB) => {
console.log(`the recipe ${resultFromDB.title} is updated`)
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
