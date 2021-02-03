const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { updateOne } = require('./models/Recipe.model');

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
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {

    /******-----NEW SINGLE RECIPE-----******/
    
    // // Comented as stated instructions in lab (no duplicates allowed)
    // Recipe
    //   .create({
    //     title: 'Tortilla de Patata',
    //     level: 'Amateur Chef',
    //     ingredients: ['Olive Oil', '7 Eggs', '4 Potato', '1 Onion', 'Salt'],
    //     cuisine: 'Spanish',
    //     dishType: 'other',
    //     duration: 45,
    //     creator: 'Spanish Culture',
    //   })
    //   .then(NewRecipeInfo => console.log('The new recipe created is:', NewRecipeInfo.title))
    //   .catch(err => console.log('Error: ', err))

    /******-----INSERTING data.json TO THE DBASE-----******/
    Recipe
      .insertMany(data)

      .then(newRecipesInfo => {
        newRecipesInfo.forEach(elm => console.log('New recipe', elm.title, 'created'))
        return Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
      })

      /*-----UPDATING RIGATONI-----*/
      .then(updatedRigatoniDuration => {
        updatedRigatoniDuration
        console.log("The Rigatoni alla Genovese duration was updated to 100")
        return Recipe.deleteOne({title: 'Carrot Cake'})
      })

      /*-----DELETING CARROT CAKE-----*/
      .then(deleteCarrotCake => {
        deleteCarrotCake
        console.log('The recipe Carrot Cake was deleted')
        return mongoose.connection.close()
      })

      /*-----CLOSING DB-----*/
      .then(closeDB => {
        closeDB
        console.log('The DB is closed')
      })
      .catch(err => console.log('Error: ', err))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
