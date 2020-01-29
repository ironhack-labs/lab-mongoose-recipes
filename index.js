const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'
//Iteration 1
const myData = {
  title: 'Tacos',
  level: 'Easy Peasy',
  ingredients: ['tortillas', 'carne', 'verdura', 'salsa'],
  cuisine: 'Mexicana',
  dishType: 'Other',
  duration: 30,
  creator: 'eliherG'
}

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(
    //Iteration 2 
    Recipe.create(myData).then(myData => console.log(myData)).catch(err => console.log(err)),
    //Iteration 3
    Recipe.insertMany(data).then((recipes) => {recipes.forEach(recipe => console.log(recipe.title))}),
    //Iteration 4
    Recipe.updateOne({name: 'Rigatoni alla Genovese'}, {duration: 100}).then(() => console.log('Duration updated')).catch((error) => console.log(error)),
    //Iteration 5
    Recipe.deleteOne({name: 'Carrot Cake'}).then(() => console.log('Cake Deleted')
    //Iteration 6
  ))
  .catch(err => console.error('Error connecting to mongo', err))

  mongoose.connection.close()