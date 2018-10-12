const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

const recipeSchema = new Schema ({
  title: {
    type: String,
    required: true,
    unique: true
  },
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
  },
  ingredients: Array,
  cuisine: {
    type: String,
    required: true
  },
  dishType: {
    type: Array,
    enumValues: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']
  },
  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg'
  },
  duration: {
    type: Number,
    min: 0
  },
  creator: String,
  created: {
    type: Date,
    default: Date.now
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);






// Recipe.create({
//   title: 'Yohoo',
//   cuisine: 'Grumpy'
// })
// .then(result => {
//   console.log('result', result.title);
// })
// .catch(error => {
//   console.log('error', error);
// });

// Recipe.insertMany(
//   data
// )
// .then(result => {
//   result.forEach(item => {
//     console.log(item.title);
//   })
// })
// .catch(error => {
//   console.log('error', error);
// });

// Recipe.updateOne({
//    'title': 'Rigatoni alla Genovese'
// }, {duration: 100})
//   .then(result => {
//     console.log('Updated succesfully!', result);
//   })
//   .catch(error => {
//     console.log('error', error);
//   });

// Recipe.remove({
//   title: 'Carrot Cake'
// }, error => {
//   console.log(error);
// })
//   .then(result => {
//     console.log('Removed succesfully!', result);
//   })
//   .catch(error => {
//     console.log('error', error);
//   });

Recipe.create({
  title: 'Yohoo',
  cuisine: 'Grumpy'
})
.then(result => {
  console.log('result', result.title);
  return Recipe.insertMany(data)
})
.then(result => {
  result.forEach(item => {
    console.log(item.title);
  })
  return Recipe.updateOne({'title': 'Rigatoni alla Genovese'}, {duration: 100})
})
.then(result => {
  console.log('Updated succesfully!', result);
  Recipe.remove({title: 'Carrot Cake'}, error => {console.log(error);})
})
.then(result => {
  console.log('Removed succesfully!', result);
  mongoose.connection.close();
})
.catch(error => {
  console.log('error', error);
  mongoose.connection.close();
});