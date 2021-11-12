const mongoose = require('mongoose');
const chalk = require('chalk')

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb+srv://Aaron-Lopez:12345@cluster0.7ywow.mongodb.net/recipe-app?retryWrites=true&w=majority';

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

//   })
//   .catch(error => {
//     console.error('Error connecting to the database', error);
//   });
  
  const connectToMongo = async ()=>{
    try {
      await mongoose.connect(MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
      })
      
      console.log(chalk.bgBlue(`Connected to the database`))
    
    } catch(err) {
      console.log(chalk.bgRed('Error connecting to the database', err))
    }
  }

  connectToMongo()

  const closeMongoose = async ()=>{
    mongoose.connection.close( () => {
    console.log(chalk.bgYellow('Mongoose default connection closed'))
  })
}

  const createRecipe = async ()=>{
    try {
      await Recipe.deleteMany()
      const recipe = await Recipe.create({
        "title": "Asian Glazed Chicken Thighs",
        "level": "Amateur Chef",
        "ingredients": [
          "1/2 cup rice vinegar",
          "5 tablespoons honey",
          "1/3 cup soy sauce (such as Silver Swan®)",
          "1/4 cup Asian (toasted) sesame oil",
          "3 tablespoons Asian chili garlic sauce",
          "3 tablespoons minced garlic",
          "salt to taste",
          "8 skinless, boneless chicken thighs"
        ],
        "cuisine": "Asian",
        "dishType": "main_course",
        "image": "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
        "duration": 40,
        "creator": "Chef LePapu"
      })
      console.log(recipe.title)
      await closeMongoose()
    } catch(err){
      console.log(chalk.bgRed(err))
    }
  }

  // createRecipe()

  const createAllRecipes = async ()=>{
    try {
      await Recipe.deleteMany()
      const response = await Recipe.create(data)
      response.forEach((recipe)=>{
        console.log(chalk.yellow(recipe.title))
      })
      await closeMongoose()
    }catch(err) {
      console.log(chalk.bgRed(err))
    }
  } 

  // createAllRecipes()

const updateRecipe = async ()=>{
  try {
    const recipe = await Recipe.findOneAndUpdate(
      {title: 'Rigatoni alla Genovese'},
      {duration: 100},
      {new :true}
    )
    console.log(chalk.bgGray(`Recipe update : ${recipe}`))
    await closeMongoose()
  } catch(err) {
    console.log(chalk.bgRed(err))
  }
}

  // updateRecipe()

  const deleteRecipe = async ()=>{
    try {
        await Recipe.deleteOne(
        {title: 'Carrot Cake'},
      )
      console.log(chalk.bgGray('Recipe delete'))
      await closeMongoose()
    }catch(err) {
      console.log(chalk.bgRed(err))
    }
  }

  //  deleteRecipe() 

 

  
