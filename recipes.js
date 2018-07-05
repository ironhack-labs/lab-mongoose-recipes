const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js')

const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
  ingredients: [String],
  cousine: { type: String, required: true },
  dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] },
  image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, default: new Date() }
})

const Recipe = mongoose.model('Recipe', recipeSchema);

const firstRecipe = {
  title: 'Asian Rolls',
  level: 'Amateur Chef',
  ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
  cousine: 'Asian',
  dishType: ['Dish'],
  image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  duration: 40,
  creator: 'Chef LePapu'
}

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
    Recipe.create(firstRecipe, function (err, e) {
      if (err) console.log('An error happened:', err);
      else console.log('The recipe is saved and its title is: ', e.title);
    });
    Recipe.insertMany(data, function (err, arr) {
      if (err) console.log('An error happened:', err);
      else {
        arr.forEach(function (e) {
          console.log('The recipe is saved and its title is: ', e.title);
        })
        Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
          .then(rec=>{console.log(rec);
            Recipe.deleteOne({ title: 'Carrot Cake' })
            .then(rec=>{console.log(rec);
              mongoose.disconnect()
            })
            .catch(e=>console.log('An error',e))
          })
          .catch(e=>console.log('An error happen',e));
       
      }
    });
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });









