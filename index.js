const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

Recipe.create({
  title: 'Caldo de pollo',
  level: 'Amateur Chef',
  ingredients: ['pollo crudo limpio y cortado', 'verduras lavadas y cortadas', 'ajo y cebolla'],
  cuisine: 'mexicana',
  dishType: 'Dish',
  image: ' https: //images.media-allrecipes.com/images/75131.jpg',
  duration: 90,
  creator: 'platillo popular'
  //created: ,
});

console.log(Recipe.title);

Recipe.insertMany(data, function(error, docs) {});

Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 });

Recipe.deleteOne({ title: 'Carrot Cake' }, function(err) {});

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipeApp', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to Mongo!');
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });

// var db = mongoose.connect('mongodb://localhost:27017/somedb');

// // Do some stuff

// db.disconnect();

//connect ECONNREFUSED 127.0.0.1:27017
