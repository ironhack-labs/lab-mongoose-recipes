const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { create } = require('domain');


const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

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
const connectToMongo = async () => {
  try {

    await mongoose.connect(MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log(`Connected to the database`);

  } catch (err) {
    console.log('Error connecting to the dataBase:', err)
  }
}

connectToMongo()

const closeMongoose = async ()=>{
  mongoose.connection.close( () => {
  console.log(chalk.bgYellow('Mongoose default connection closed'))
})
}



const createRecipe = async () => {
  try {
    const firstRecipe = await Recipe.create({
      title: "Asian Glazed Chicken Thighs",
      level: "Amateur Chef",
      ingredients: [
        "1/2 cup rice vinegar",
        "5 tablespoons honey",
        "1/3 cup soy sauce (such as Silver Swan®)",
        "1/4 cup Asian (toasted) sesame oil",
        "3 tablespoons Asian chili garlic sauce",
        "3 tablespoons minced garlic",
        "salt to taste",
        "8 skinless, boneless chicken thighs"
      ],
      cuisine: "Asian",
      dishType: "main_course",
      image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 40,
      creator: "Chef LePapu"

    })
    await closeMongoose()
  } catch (err) {
    console.log('ERROR: ', err)
  }
}
// createRecipe()


const multipleRecipes = async () => {
  try {
    await Recipe.deleteMany()
    const allRecipes = await Recipe.create(data)
    allRecipes.forEach((recipe)=>{
    console.log(recipe.title)
    
    })
    await closeMongoose()

  } catch (err) {
    console.log('ERROR: ', err)
  }



}
// multipleRecipes ()

const UpdateRecipes = async() =>{
  try {

    const updatedRecipe = await Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'},{duration:100},{new: true})
    console.log(updatedRecipe)
    await closeMongoose()
  }catch (err) {
    console.log('ERROR: ', err)
  }

}
// UpdateRecipes()

const DeleteRecipe = async() =>{
  try {

    const deleteCarrot = await Recipe.deleteOne({title:'Carrot Cake'})
    console.log('Carrot Cake has been deleted!')
    await closeMongoose()
  }catch (err) {
    console.log('ERROR: ', err)
  }

}
// DeleteRecipe()



