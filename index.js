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
    useFindAndModify: false     // -- ITERATION 4 - UPDATE RECIPE (Part 1/2) --
  })

  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })

  .then(() => {
    Recipe.create({     // -- ITERATION 2 - CREATE A RECIPE --
            title: 'Lentejas',
            level: 'Easy Peasy',
            ingredients: ['Lentejas', 'Patatas', 'Chorizo', 'Agua', 'Tomate', 'Sal', 'Cebolla'],
            cuisine: 'Spanish',
            dishType: 'main_course',
            image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.recetasgratis.net%2Freceta-de-lentejas-estofadas-con-chorizo-71176.html&psig=AOvVaw2-Ji7Woi6_8MZ7Pc0xDxAZ&ust=1605195371598000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCODJlvbo-uwCFQAAAAAdAAAAABAD',
            duration: 40,
            creator: 'Chef Carlos Arguiñano',
            created: '2020-11-11'
          })
            
          .then(theNewRecipeCreated => {
            console.log('The new recipe is:', theNewRecipeCreated.title)
            return Recipe.insertMany(data)      // -- ITERATION 3 - INSERT MULTIPLE RECIPES --
          })

          .then(theNewsRecipesInsert => {
            theNewsRecipesInsert.forEach(elm => console.log('The news recipes are:', elm.title))
            return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 })      // -- ITERATION 4 - UPDATE RECIPE (Part 2/2) --
          })

          .then(theRecipeUpdate => {
            console.log('The recipe that has been updated is:', theRecipeUpdate.title)
            return Recipe.deleteOne({ title: 'Carrot Cake' })     // -- ITERATION 5 - REMOVE A RECIPE --
          })

          .then(theRecipeDeleted => {
            console.log('The recipe has been deleted. The status is:', theRecipeDeleted)
            return mongoose.disconnect()      // -- CLOSE THE DATABASE --
          })
  })
  
  .catch(error => {
    console.error('Error connecting to the database', error)
  })
