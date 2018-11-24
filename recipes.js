const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });



const recipesSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] }, 
  ingredients: [],
  cuisine: { type: String, required: true },
  dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] },
  image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
  duration: { type: Number, min: 0 },
  creator: String,
  created: { type: Date, default: Date.now },

});

const Recipe = mongoose.model('Recipe', recipesSchema);
module.exports = Recipe;

Recipe.create ({ title: 'Le Plat du Shlagg' , level: 'UltraPro Chef', ingredients: ['nothing', 'a bot of love'] , cuisine: 'Zarhzä' , dishType: 'Other', duration: 15 })
  .then(title => { console.log('The title is: ', title) })
  .catch(err => { console.log('An error happened:', err) });


Recipe.insertMany (data)
  .then(recips => { console.log('We added all the  ', recips)
  
  Recipe.updateOne ({title: "Rigatoni alla Genovese"}, { duration: 100 })
      .then(title => { console.log('We updated ', title) })
      .catch(err => { console.log('An error happened:', err) });

    Recipe.findByIdAndRemove ({title: "Carrot Cake"})
      .then(title => { console.log('We removed ', title) })
      .catch(err => { console.log('An error happened:', err) }); 
  })
  .catch(err => { console.log('An error happened:', err) });


/* FUNCTION TO DISCONNECT */