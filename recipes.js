const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  
const RecipesSchema = new Schema ({
  title: String,
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
  } ,
  ingredients: Array,
  cuisine: String,
  dishType: {
    type: String,
    enum: ['Breakfast', 'Dish', 'Snak', 'Drink', 'Dessert', 'Other']
  } ,
  image: String,
  duration: Number,
  creator: String,
  created: Date,

})

const Recipe = mongoose.model ('Recipe', RecipesSchema);

const recipe1 = new Recipe({title: 'Macarrones con queso'});
console.log('recipe1');

Recipe.insertMany(data)
  .then((result) => {
    result.forEach(recipe => {
      console.log(recipe.title)
    })

    Recipe.updateMany({title: 'Rigatoni alla Genovese'}, {duration: 100})
    .then((recipe) => {
      console.log('Receta modificada correctamente', recipe)
      
      Recipe.deleteMany({title: 'Carrot Cake'})
        .then((recipe) => {
        console.log('Receta eliminada correctamente', recipe)

        mongoose.connection.close();  

        }) 
        .catch((error) => {
        console.log('error', error);
        })
    })
    .catch((error) => {
      console.log('error', error);
    })
    
  })

.catch((error) => {
  console.log('error', error);
})
  


  
