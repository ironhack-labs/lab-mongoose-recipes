const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

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
    useUnifiedTopology: true
  })
  
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })

  .then(() => {

    //Iteration 2
    Recipe.create({title: 'Pasta with Sauce', level: 'Easy Peasy', ingredients: ['pasta', 'sauce'], cuisine: 'haute'})
      .then((recipe) => {console.log('recipe saved:', recipe.title);
      
      // Iteration 3 - Insert multiple recipes
      Recipe.insertMany(data)
        .then((recipes) => {recipes.forEach(recipe => {console.log('recipe added:', recipe.title);
      })
      
        //Iteration 4 - Update recipe
        Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100})
          .then((recipe) => {console.log('recipe updated:', recipe.title);
        })

        //Iteration 5 - Remove a recipe
        Recipe.deleteOne({title: 'Carrot Cake'})
          .then((val) => {console.log('recipes deleted:', val.deletedCount);
        })

        //Iteration 6 - Close the Database
        .then(() => {
        mongoose.connection.close(()=> {
          console.log('Now Disconnected');
        });

      })
      })
      })             
      })

  .catch(err => console.error(err));

