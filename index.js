const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');



const newRecipe = {
  title: "pozole",
  level: "Easy Peasy",
  ingredients: ["puerco, maiz, chile, agua"],
  cuisine: "mexicana",
  dishType: "main_course",
  image: "https://images.media-allrecipes.com/images/75131.jpg",
  duration: 30,
  creator: "Andoni"
}

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
    

    //iteracion2
    Recipe.create(newRecipe)
    .then((recipe) => {
      console.log(recipe.title)
  })
  .catch((error) => {
      console.log(error)
  })
    // //iteracion3
    // Recipe.insertMany(newRecipe)
    // .then((data) => {
    //   for(let i = 0; i < data.length; i++){
    //     console.log(data[i].title)
    //   }
    // })
    
    // //iteracion4
    // Recipe.findOneAndUpdate(newRecipe)
    // .then
    // .catch

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
