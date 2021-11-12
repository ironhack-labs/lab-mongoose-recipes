const mongoose = require('mongoose')
const chalk = require('chalk')

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model')
// Import of the data from './data.json'
const data = require('./data')

const DB = 'recipe-app'

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
    await mongoose.connect(`mongodb://localhost:27017/${DB}`, {
      // useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
      // useFindAndModify: false
    })
    console.log(chalk.bgBlue('Connected to Mongo'))
  }
  catch (err) {
    console.log(chalk.bgRed('Error:', err))
  }
}

connectToMongo()

const createRecipe = async() => {
  try{
    const recipe = await Recipe.create({
      title: 'Hamburger',
      level: 'Easy Peasy',
      ingredients: ['Hamburger bread', 'Beef', 'Lettuce', 'Tomato', 'Sauces', 'Cheddar cheese'],
      cuisine: 'Fast food',
      dishType: 'main_course',
      image: 'https://www.aspicyperspective.com/wp-content/uploads/2020/05/Best-Hamburger-Patty-Recipe-17-768x1152.jpg',
      duration: 15
    })
    console.log(chalk.bgBlue('Recipe title:', recipe.title))
  }
  catch(err){
    console.log(chalk.bgRed('Error:', err))
  }
}

createRecipe()
