const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'
const recipePersonal = {
  title: 'Chicken Enchiladas',
  level: 'Amateur Chef',
  ingredients: ['chicken', 'tortillas'],
  cuisine: 'Mexican',
  dishType: 'Dish',
  image: 'https://images-gmi-pmc.edge-generalmills.com/8ba62fee-ecf3-4360-8b7f-ae7cbf7c6d74.jpg',
  duration: 100,
  creator: 'Chef Mexa'
}


// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  Recipe.create(recipePersonal)
  .then(() => {
    console.log(`Connected to Mongo! the title of the recipe is ${this.Recipe.title}`);
    mongoose.connection.close()
  }).catch(err => {
    console.error('Error connecting to mongo', err);
    mongoose.connection.close()
  });

  //Insert Many
  mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  Recipe.create(data)
  .then(() => {
    console.log(`Connected to Mongo! the title of the recipe is ${this.Recipe.title}`);
    mongoose.connection.close()
  }).catch(err => {
    console.error('Error connecting to mongo', err);
    mongoose.connection.close()
  });


  //Update recipe
Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {$set: {duration: 100}})
  .then(()=>{
    console.log('Successsss!!!!')
    mongoose.connection.close()
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
    mongoose.connection.close()
  })

//Remove a recipe 
Recipe.deleteOne({title: 'Carrot Cake'})
  .then(()=>{
    console.log('Deleted!!!!')
    mongoose.connection.close()
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
    mongoose.connection.close()
  })