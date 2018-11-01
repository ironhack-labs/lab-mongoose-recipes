const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  const recipeSchema = new Schema({
    title: {type: String, required: true, unique: true},
    level: {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
    ingredients: [String],
    cuisine: {type: String, required: true},
    dishType:  {type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
    image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
    duration: {type: Number, min: 0},
    creator: String,
    created: {type: Date, default: new Date()}
  });

const Recipies = mongoose.model('Recipies', recipeSchema);

// Recipies.create({
//   title: 'dasads',
//   level: 'Easy Peasy',
//   ingredients: ['assa'],
//   cuisine: 'American',
//   dishType: 'Dish',
//   image: 'https://images.media-allrecipes.com/images/75131.jpg',
//   duration: 20,
//   creator: 'asasdas'
// })
//   .then((user) => { console.log('title:', user.title) })
//   .catch((err) => { console.log('An error happened:', err) });

Recipies.insertMany(data)
  .then((data) => { 
    console.log('HEY FROM THEN')
    data.forEach(function(recipie) {
      console.log(recipie.title);
    });
  })
  .catch((err) => { console.log('An error happened:', err) });

  Recipies.updateOne({title: 'Rigatoni alla Genovese'}, { duration: 100 })
  .then(answer => console.log('Success!!!!', answer)
  )
  .catch(answer => console.log('error!', answer));


  Recipies.deleteOne({title: 'Carrot Cake'})
  .then(answer => console.log('Success in delete carrot cake!!!!', answer)
  )
  .catch(answer => console.log('error! in deleting carrot cake', answer));