const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'
const dataPersonal = {
  title: 'Chiles en nogada',
  level: 'UltraPro Chef',
  ingredients: ['1 poblan pepper', 'incredible filling', 'more than enough nogada'],
  cuisine: 'Mexican',
  dishType: 'Dessert',
  image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  duration: 120,
  creator: 'Chef Poblano'
}

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
Recipe.create(dataPersonal)  
.then(() => {
    console.log(`Connected to Mongo! and the title of the recipe is ${this.Recipe.title}`);
    mongoose.connection.close()
  }).catch(err => {
    console.error('Error connecting to mongo', err);
    mongoose.connection.close()
  });

Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'},{$set: {duration: 100}})
.then(() => {
  console.log(`Successsssssssssssss`);
  mongoose.connection.close()
}).catch(err => {
  console.error('Error connecting to mongo', err);
  mongoose.connection.close()
});

Recipe.deleteOne({title: 'Carrot Cake'})
.then(() => {
  console.log(`Deleted, boi`);
  mongoose.connection.close()
}).catch(err => {
  console.error('Error connecting to mongo', err);
  mongoose.connection.close()
});
