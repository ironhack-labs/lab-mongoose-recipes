const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const recipeSchema = new Schema({
  title: {type: String, required: true, unique: true},
  level: {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients: {type: Array},
  cousine: {type: String, required: true},
  dishType: {type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
  image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type: Number, min: 0},
  creator: {type: String},
  created: {type: Date, default: Date.now}
});

const Recipe = mongoose.model('Recipe', recipeSchema);

Recipe.create({
  title: 'Big Cake',
  level: 'Easy Peasy',
  ingredients: ['chocolate', 'flower', 'sugar'],
  cousine: 'Granma Kitchen',
  dishType: 'Dessert',
  duration: 45,
  creator: 'Granma Dama'
})
.then((recipe) => { console.log('The recipe is saved and its title is: ', recipe.title);

  Recipe.insertMany(data)
  .then((recipe) => { 
    recipe.forEach(element => {
      console.log('Recipe from the array inserted. Title:', element.title);
    });

      Recipe.updateOne({ title: 'Rigatoni alla Genovese'}, {duration: 100})
      .then((updated) => { console.log('Recipe updated. Here is the result:', updated);

        Recipe.deleteOne( { title: 'Carrot Cake' } )
        .then((deleted) => { console.log('Recipe deleted. Here is the result:', deleted);
          mongoose.connection.close()
          .then(() => {
            console.log('The connection was successfully closed!')
          }).catch(err => {
            console.error('Error closing the connection', err)
          });
        })
        .catch((err) => { console.log('Ann error happened:', err) });

      })
      .catch((err) => { console.log('Ann error happened:', err) });

    })
    .catch((err) => { console.log('Ann error happened:', err) });

})
.catch((err) => { console.log('An error happened:', err) });