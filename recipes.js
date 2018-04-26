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
    title: { type: String, unique: true, required: true },
    level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
    ingredients: { type: Array },
    cousine: { type: String, required: true},
    dishType: { type: String, enum:['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
    image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
    duration: { type: Number, min: 0},
    creator: { type: String},
    created: { type: Date, default: Date.now}
    
  });

  const recipe = mongoose.model('recipe', recipeSchema);


  // recipe.create({ 
  //   title: 'Asian Glazed Chicken Thighs',
  //   level: 'Amateur Chef',
  //   ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
  //   cousine: 'Asian',
  //   dishType: ['Dish'],
  //   image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  //   duration: 40,
  //   creator: 'Chef LePapu'
  // }, function (err, recipe) {
  //   if (err) console.log('An error happened:', err);
  //   else console.log('The recipe is saved and its title is: ', recipe.title);
  // });
  
  // recipe.insertMany(data, function(err, recipe) {
  //   if (err) console.log('An error happened:', err);
  //   else console.log('The recipe is saved and its title is: ', recipe);
  // });

  // recipe.find({}, (err, recipe) => {
    // cats is an array of Cat instances
  //   recipe.forEach((recipe)=> {
  //     console.log('Recipe title: ', recipe.title)})})

  // recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
  //   .then(recipe => {console.log("The duration was changed to: ", recipe.find({duration}))})
  //   .catch(err => {console.log(err)});

  // recipe.findByIdAndRemove("5ae22996c292cb580c0df733")
  // .then(recipe => {console.log('The carrot cake was removed')})
  // .catch(err => {console.log('The carrot cake was not removed')})
  recipe.connection.close();
  