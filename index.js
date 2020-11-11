const   mongoose = require('mongoose'),
        chalk = require('chalk'),
        Recipe = require('./models/Recipe.model'),
        data = require('./data')

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app'

//  Console colors
const yellow = chalk.bold.yellow,
      magenta = chalk.bold.magenta,
      blue = chalk.bold.blueBright,
      red = chalk.bold.red

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
  .then(self => {
    console.log(blue(`Connected to the database: "${self.connection.name}"`));
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    Recipe.create(data[ 0 ])
          .then(newRecipe => console.log(yellow(newRecipe.title)))
          .then(() => Recipe.insertMany(data.slice(1)))
          .then(recipeArr => recipeArr.forEach(recipe => console.log(magenta(recipe.title))))
          .then(() => Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: '100'}, { new: true }))
          .then(updated => console.log(yellow('Modified recipe is:', updated)))
          .then(() => Recipe.deleteOne({ title: 'Carrot Cake' }))
          .then(info => console.log(info))
          .catch(error => console.error(red(error)))
  })
  .then(self => self.connection.close(() => console.log(blue('Connection closed'))))
  .catch(error => console.error(red('Error connecting to the database', error)))



  

