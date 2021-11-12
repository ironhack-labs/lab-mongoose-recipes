const mongoose = require('mongoose');
const chalk = require('chalk');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const DB = 'recipe-app';


// Connection to the database "recipe-app"
// mongoose
//   .connect(MONGODB_URI, {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(self => {
//     console.log(`Connected to the database: "${self.connection.name}"`);
//     // Before adding any recipes to the database, let's remove all existing ones
//     return Recipe.deleteMany()
//   })
//   .then(() => {
//     // Run your code here, after you have insured that the connection was made
//   })
//   .catch(error => {
//     console.error('Error connecting to the database', error);
//   });


const connectToMongo = async()=>{
  try {

   await mongoose.connect(`mongodb://localhost:27017/${DB}`, {  //aquesta adreça sempre és la mateixa. És per conectar-nos a la BBDD
      useNewUrlParser: true,
      useUnifiedTopology: true,  
    })
    
    console.log(chalk.bgBlue('Conectado a Mongo'))

  } catch(err){
    console.log('Error:', err)
  }
}

connectToMongo()

//CREATE

const createRecipe = async()=>{  
  try{
    const student = await Recipe.create({
      title: "Parmigiana di melanzane",
      level: "Amateur Chef",
      ingredients: [
        "3 large firm aubergines",
        "olive oil",
        "1 onion",
        "½ a bulb of spring garlic , or 1 clove of regular garlic",
        "1 heaped teaspoon dried oregano",
        "2 x 400 g tins of quality plum tomatoes",
        "wine vinegar",
        "1 bunch of fresh basil , (30g)",
        "3 large handfuls of Parmesan cheese",
        "2 handfuls of dried breadcrumbs",
        "a few sprigs of fresh oregano",
        "150 g buffalo mozzarella"
      ],
      cuisine: "Italian",
      dishType: "main_course",
      image: "https://img.jamieoliver.com/jamieoliver/recipe-database/oldImages/large/33_1_1350893951.jpg?tr=w-800,h-1066",
      duration: 90,
      creator: "Chef Guillem"
    })
    console.log(receipe)
  }catch(err){
    console.log('ERROR: ', err)
  }

}

  // createRecipe()


  const createDataRecipe = async()=>{  
    try{
      const dataRecipes = await Recipe.insertMany(data)
      dataRecipes.forEach((recipe) => {
      console.log(chalk.bgBlue("Title ", recipe.title))
      })
      console.log(dataRecipes)

    }catch(err){
      console.log('ERROR: ', err)
    }
  
  }
//createDataRecipe()