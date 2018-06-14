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
  title  : { type: String, required: true, unique: true },
  level :  { type: String, enum: [ 'Easy Peasy', 'Amateur Chef', 'UltraPro Chef' ] }, 
  ingredients : Array,
  cousine : String,
  dishType :  { type: String, enum: [ 'Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other' ] }, 
  image :{type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
  duration :  { type: Number, min: 0 },
  creator : String,
  created: {type: Date, default: Date.now}
});

const Receipe = mongoose.model('Receipe', recipeSchema);


var newRecipe = new Receipe({
  title  :"AHAAAAHAAAAAPizza",
  // level :  ,
  ingredients : ['bread','Tomato'],
  cousine : "lala",
  dishType :  'Other', 
  // image :,
  duration :  10,
  creator : 'MEME'
  // created: {type: Date, default: Date.now}
})

Receipe.create(newRecipe)
  .then((newRecipe) => { console.log('The user is saved and its value is: ', newRecipe.title) })
  .catch((err) => { console.log('An error happened:', err) });

Receipe.insertMany(data, function(error, docs) {});


Receipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
.then(() => { console.log('Updated!') })
  .catch((err) => { console.log('An error happened:', err) });



  



Receipe.deleteOne({ title: "Carrot Cake"})
.then(() => { console.log('Remove') })
.catch((err) => { console.log('An error happened:', err) });




  setTimeout(function(){ mongoose.disconnect(); }, 10000);
