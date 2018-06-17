const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

const recipeSchema = new Schema({
  title: {type: String, required: true, unique: true},
  level: {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients: {type: Array},
  cousine: {type: String, required: true},
  dishType: {type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
  image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type: Number, min: 0},
  creator: {type: String},
  created: {type: Date, default: Date.now},
});

const recipe = mongoose.model('recipe',recipeSchema);

// recipe.collection.drop();

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });


  recipe.create({
    title: 'IceCream',
    level: 'Easy Peasy',
    ingredients: ['milk','sugar'],
    cousine: 'Mine',
    dishType: 'Dessert',
    image: 'https://korea.lablob.com/wp-content/uploads/2012/09/southkoreanfood-tall-soft-ice-cream-sold-in.jpeg',
    duration: 1,
    creator: 'me',
  }).then((recipe) => { console.log('The recipe is saved and its title is: ', recipe.title)}).catch((err) => { console.log('An error happened:', err) });

  recipe.insertMany(data).then((recipes) => { recipes.forEach(recipes => {
        console.log('The recipes are saved and their titles are:', recipes.title);    
  }); })
  .catch((err) => { console.log('An error happened:', err) });

  recipe.updateOne({title: 'Rigatoni alla Genovese'},{duration: 100})
  .then((recipe) => {console.log(recipe,'Updating succes!!')
  mongoose.connection.close()
})
  .catch((err) => {console.log(err)});

  recipe.deleteOne({title: 'Carrot Cake'})
  .then((recipe) => {console.log(recipe,'Deleting succes!!')
})
  .catch((err) => {console.log(err)});