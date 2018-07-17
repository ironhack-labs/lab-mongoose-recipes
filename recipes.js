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
    title : { type: String, required: true, unique: true},
    level: { type: String, enum: ['Easy Peasy','Amateur Chef','UltraPro Chef']},
    ingredients  : [],
    cousine: {type: String, required: true},
    dishType: {type: String, enum : ['Breakfast','Dish','Snack','Drink','Dessert','Other']},
    image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
    duration: {type: Number, min: 0},
    creator: String,
    created: {type: Date, default: new Date()}

  });

  const Recipe = mongoose.model('Recipe', recipeSchema);

  const newRecipe = {
    title: 'Mongetes amb cansalda',
    level: 'Easy Peasy',
    ingredients: ['mongetes del ganxet','butifarra','cansalada'],
    cousine: 'catalana',
    dishType: 'Dish',
    duration: 30,
    creator: 'Albert Farre'
  }

  // We insert one receipt to DB

  Recipe.create(newRecipe)
  .then((recipe) => { console.log('The recipe is saved and its value is: ', recipe) })
  .catch((err) => { console.log('An error happened:', err) });

  // We insert many documents into DB

  Recipe.insertMany(data)
  .then((recipe) => { recipe.forEach((element, index, array)=> {console.log('The title is: ', element.title)})})
  .catch((err) => { console.log('An error happened:', err) });

  // We update the duration of the Receip

  Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100})
  .then((successCallback) => {console.log("The duration has been updated successfully!!!")})
  .catch((errorCallback) => { console.log('An error happened:', errorCallback) });

  // We delete the Receip
  Recipe.remove({ title: 'Carrot Cake' }, function (err) {
    if (!err) {
      console.log("The Carrot Cake has been removed successfully!!!");
    }
    else {
      console.log('An error happened:', errorCallback);
    }
  })

  // We close the connection
  mongoose.connection.close();
  

