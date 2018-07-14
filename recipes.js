const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  }, //Type String. It should be required and unique.
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
  }, //Type String. Only can be one of the following values: Easy Peasy - Amateur Chef - UltraPro Chef (remember the ENUM 😉)
  ingredients: Array,
  cousine: {
    type: String,
    required: true
  }, //Type String. Should be required.
  dishType: {
    type: String,
    enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']
  }, //Type String. Possible values: Breakfast - Dish - Snack - Drink - Dessert - Other.
  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg'
  }, //Type String. Default value: https://images.media-allrecipes.com/images/75131.jpg.
  duration: {
    type: Number,
    min: 0
  }, // Type Number. Min value should be 0.
  creator: String,
  created: {
    type: Date,
    default: Date.now()
  } //Type Date. By default today
});

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const Recipe = mongoose.model('Recipe', recipeSchema);

//Iteration 2. insert recipe
rand = Math.floor(Math.random() * 100);
const randomRecipe = {
  title: `recipe ${rand}`, //'Asian Glazed Chicken Thighs',
  level: 'Amateur Chef',
  ingredients: ['ing 1', 'ing 2', 'ing 3'],
  cousine: 'Asian',
  dishType: 'Dish',
  image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  duration: rand,
  creator: `recipe ${rand}`
};

Recipe.create(randomRecipe)
  .then((element) => {
    console.log(`created ${element.title}`)
  })
  .catch((err) => {
    console.log('error:', err)
  });

// Iteration 3 insert array of recipes
Recipe.insertMany(data)
  .then((element,index) => {
    console.log(`inserted ${element}`)
// iteration 4. modify record
    return Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
    .then((element) => {
      console.log('updated duration in Rigatoni recipe')
// Iteration 5 - Remove a recipe
      return Recipe.remove({title: 'Carrot Cake'})
          .then((element) => {
            console.log('deleted Carrot Cake recipe')
//Iteration 6 - Close the Database
            mongoose.connection.close();
          })
      })
  })
  .catch((err) => {
    console.log('error:', err)
  });

//Iteration 3
// Recipe.insertMany(data)
// .then((element) => {console.log(`inserted ${element.title}`) })
// .catch((err) => {console.log('error:', err)});

// iteration 4. modify record
// Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
//   .then((element) => {console.log(`updated ${element.title}`)})
//   .catch((error) => {console.log('error:', error)});

// Iteration 5 - Remove a recipe
// Recipe.remove({title: 'Carrot Cake'})
//   .then((element) => {console.log(`deleted ${element.title}`)})   
//   .catch((error) => {console.log('error:', error)});

//Iteration 6 - Close the Database
//mongoose.connection.close();
//mongoose.disconnect();