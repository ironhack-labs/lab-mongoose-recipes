const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');
const recipeArray = require('./data.js');

const recipeSchema = new Schema ({
  title: String,
  level: {type: String, enum: ['Easy Peasy','Amateur Chef', 'UltraPro Chef']},
  ingredients: Array,
  cuisine: String,
  dishType: {type: String, enum: ['Breakfast','Dish','Snack','Drink','Dessert','Other']},
  image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: Number,
  creator: String,
  created: {type: Date, default: Date.now }
})

const Recipe = mongoose.model('Recipe', recipeSchema);

const arepa = {
  title: 'Arepa',
  level: 'Amateur Chef',
  ingredients: ['Harina Pan','agua','sal','queso'],
  cuisine: "Venezuelan",
  dishType: "Other",
  image: 'https://theyumlist.net/wp-content/uploads/2017/06/Reina-Pepiada-Arepa.jpg',
  duration: 15,
  creator: "God himself",
  //created: 'string'
}

//mongoose.connection.db.dropCollection('Recipe');
Recipe.remove()
  .then(()=>{
      console.log("remove");
  })
// Recipe.create(arepa)
//   .then((result) => {
//     console.log('result', result)
//   })
//   .catch((error) => {
//     console.log('error', error)
//   });

  Recipe.insertMany(recipeArray)
  .then((result) => {
    console.log('result many', result)

    Recipe.update({title : "Rigatoni alla Genovese"}, {duration: 100})
      .then(() => {
        console.log('Update successful');
      }).catch(err => {
        console.error('Error', err);
    });
    
    Recipe.remove({ title: 'Carrot Cake' })
      .then(() => {
        console.log('Carrot removed');
      }).catch(err => {
        console.error('Error', err);
    });    
  })
  .catch((error) => {
    console.log('error', error)
  });
  


mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
