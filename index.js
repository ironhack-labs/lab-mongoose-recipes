const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

let recipe1 = {
  title: 'Spinash Lasagna',
  level: 'Amateur Chef',
  ingredients: ['1 cup bechamel sauce', '1 punch of spinash'],
  cuisine: 'Italian',
  dishType: 'Dish',
  image: '',
  duration: 100,
  creator: 'Chef Damien',
};

Recipe.create(recipe1)
  .then((result) => console.log('Inserted RECIPE1 successful !', result))
  .catch(err => console.error(err));

Recipe.insertMany(data)
  .then((result) => result.forEach(element => {
    console.log(element.title)
  }))
  .catch(err => console.error(err));


  Recipe.findOneAndUpdate({ 'title': 'Rigatoni alla Genovese' }, { $set: { 'duration':  100 } })
  .then((result) => console.log('Duration successfuly updated', result))
  .catch(err => console.log(err));

 Recipe.deleteOne({ 'title':'Carrot Cake'})
   .then( (result) => console.log('Success deleting document', result))
   .catch(err => console.log(err));
