const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const recipeSchema = new Schema ({
  title: {type: String, required: true, unique: true},
  level: {type: String, enum:['Easy Peasy','Amateur Chef','UltraPro Chef']},
  ingredients: [],
  cousine: {type: String, required: true},
  dishType: {type: String, enum:['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
  image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type: Number,min: 0},
  creator: String,
  created: {type: Date, default: Date.now}
});

const Recipe = mongoose.model ('Recipe', recipeSchema);

Recipe.create({title: 'Tamales', 
              level: 'UltraPro Chef',
              ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
              cousine: 'Guatemalan',
              dishType: ['Dish'],
              image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
              duration: 900,
              creator:'Chefs Ladinos'})
  .then((Recipe)=>{
    console.log(Recipe.title);
  })
  .catch((err)=>{
    console.log(err);
  });

Recipe.insertMany(data).then((data) => {
  for(var i=0;i<data.length;i++){
    console.log(data[i].title);
  }
})

.then(() => {
  Recipe.findOneAndUpdate({title: 'Rigatoni alla Geonvese'}, {duration: 100},{new: true})
})
.then(() => {
  console.log('Success');
})
.catch((err) => {
  console.log(err);
});
