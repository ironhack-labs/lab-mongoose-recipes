const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');
const ModRe = require('./models/ModRe');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  ModRe.create(  {
    title: 'Chile Relleno',
    level: 'Pro Chef',
    ingredients: ['Chilli', 'Cheese'],
    cuisine: 'Mexican',
    dishType: ['Dish'],
    image: 'https://www.google.com.mx/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjV8dyx0NffAhUCYawKHbBEBkEQjRx6BAgBEAU&url=https%3A%2F%2Fwww.thespruceeats.com%2Fhow-to-make-chiles-rellenos-and-mdash-mexican-recipe-4129356&psig=AOvVaw0QOrTMNmmRdhNqzo6SO2Ik&ust=1546811597265874',
    duration: 50,
    creator: 'Chef Chuchini'
  }, function (err, recipe) {
    if (err) {
        console.log('An error happened:', err);
    } else {
        console.log('The recipe has been saved with name: ', recipe.title);
    }
  });


  ModRe.insertMany(data, (err) => {
     if (err) { throw(err) }
    console.log(`Recipe(s) save: ${data.length} recipe(s)`)
  });

  ModRe.updateOne({ title: 'Rigatoni alla Genovese'}, { duration: 100 })
  .then(()=>{
    console.log('Data Updated');
  })
  .catch(err=>console.log(err))

  ModRe.deleteMany({ title: 'Carrot Cake'})
  .then(()=>{
    console.log('Data Removed');
    mongoose.connection.close()
  })
  .catch(err=>console.log(err))

 