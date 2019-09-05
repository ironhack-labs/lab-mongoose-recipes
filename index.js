const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    Recipe.create({
      title: 'Chocolate Princesa',
      level: 'Easy Peasy',
      ingredients: ['1/2 cup light brown sugar', '1 large egg', '2 tablespoons milk', '1 1/4 teaspoons vanilla extract', '2 cups semisweet chocolate chips'],
      cuisine: 'Mexicana',
      dishType: 'Dish',
      image: '',
      duration: 60,
      creator: 'Chef Fernanda'
    })
    Recipe.create(data)

    Recipe.updateOne({ title: 'Rigatoni alla Genovese'}, { duration: 100 })
    Recipe.deleteOne({ title: 'Carrot Cake'})

    .then(docs=>{
      console.log('Connected to Mongo!');
      console.log(`${docs.title}`);
      mongoose.connection.close()
    })
    .catch(error=>{
      console.log(error);
      mongoose.connection.close()
    })
   
  }).catch(err => {
    console.error('Error connecting to mongo', err);
   
  });

