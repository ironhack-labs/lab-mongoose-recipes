const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

mongoose.set('useFindAndModify', false);

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
    //IT 2
    const recipeData = {
      title: "Tarte aux pommes",
      level: "Amateur Chef",
      ingredients: ["pommes", "farine", "sucre", "oeufs", "cannelle", "compote de pommes"],
      cuisine: "française",
      dishType: "dessert",
      duration: 10,
      creator: "Marie Tatin"
    }

    Recipe.create(recipeData)
      .then(recipe => {
        console.log('New recipe saved: ', recipe.title)

        //IT 3
        Recipe.insertMany(data)
          .then(recipes => {
            recipes.forEach(r => console.log(r.title))
            
            //IT 4
            Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
            .then(() => console.log("Rigatoni alla Genovese has been updated"))
            .catch(() => console.log("Failed to update Rigatoni alla Genovese"))
          
            //IT 5
            Recipe.deleteOne({name: "Carrot Cake"})
              .then(() => {
                console.log('Carrot Cake has been removed')
                
                //IT 6
                mongoose.connection.close(() => {
                  console.log('Mongoose disconnected');
                })
              })
              .catch(() => console.log('Failed to remove Carrot Cake'))

          })
          .catch(() => console.log('Error with inserting many recipes'))
      })
      .catch(err => console.log("Error creating new recipe", err))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
