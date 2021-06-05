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
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    //return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    //Iteration 2 Skiped
        //Iteration 3
        Recipe.insertMany(data)
        .then(console.log("Recipes inserted"))
        .catch(error => console.log('Something wen wrong:', error));
  
      //Iteration 4
      Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration:100}, {new: true})
       .then(updatedRecipe => console.log(`${updatedRecipe.title}'s duration was updated`))
       .catch(error => console.log('Something wen wrong:', error));
  
      //Iteration 5
      Recipe.deleteOne({ title: 'Carrot Cake' })
        .then(console.log("Recipe deleted"))
        .catch(error => console.log('Something wen wrong:', error));
  })
  //iteration 6
  .then(mongoose.connection.close())

  .catch(error => {
    console.error('Error connecting to the database', error);
  });


