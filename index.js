const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
// console.log(data)
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => { 
    const newFood = {
      title: 'Fried Chicken',
      level: 'Easy Peasy',
      ingredients: [
        'Chicken',
        'Oil',
        'Salt',
        'Pepper',
        'Assorted Seasoning'
      ],
      cuisine: 'Southern',
      dishType: 'main_course'
    }

    Recipe.create(newFood).then((newFoods) => {
      console.log(newFoods.title);
      console.log('Newly added Recipe: ', newFoods);
    })
  }).then(() => {
    Recipe.create(data).then((newlyAddedRecipes) => {
      console.log('These are the new Recipes: ', newlyAddedRecipes);
    })
  }).then(() => {
    Recipe.findByIdAndUpdate('631c908f263ead1285fecf14', {duration: 100}, {new: true}).then(updatedRecipe => {
      console.log(`Success:  ${updatedRecipe}`);
      
      
    })
      
    }).catch(err => {
      console.log(err);
    });
    
    
      
  // });
      
 
  //     Recipe.deleteOne({title: 'Carrot Cake'}).then((removedItem) => {
  //       console.log('This item has been removed: ', removedItem);
  //     }).catch(err => {
  //       console.log(err);
  //     });
  //   }).catch(error => {
  //   mongoose.disconnect();
  //   throw error;
  // })

    
         