const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

const newRecipe = new Recipe ({
  title:        'Moussaka Vegetarian',
  level:        'Easy Peasy',
  ingredients:  [ '1 eggplant thinly sliced',
                  '1 tablespoon olive oil or more as needed',
                  '1 large zucchini thinly sliced',
                  '2 potatoes, thinly sliced',
                  '1 onion, sliced',
                  '1 clove garlic, chopped',
                  '1 tablespoon white vinegar',
                  '1 (14.5 ounce) can whole peeled tomatoes, chopped',
                  '1/2 (14.5 ounce) can lentils, drained with liquid reserved',
                  '1 teaspoon dried oregano',

                  '2 tablespoons chopped fresh parsley',
                  'salt and ground black pepper to taste',
                  '1 cup crumbled feta cheese',
                  '1 1/2 tablespoons butter',
                  '2 tablespoons all-purpose flour',
                  '1 1/4 cups milk',
                  'ground black pepper to taste',
                  '1 pinch ground nutmeg',
                  '1 egg, beaten',
                  '1/4 cup grated Parmesan cheese'],
  cuisine:      'Greek',
  dishType:     'Dish',
  image:        'https://thehealthyfoodie.com/wp-content/uploads/2018/10/Vegetarian-Moussaka-19.jpg',
  duration:      30,
  creator:      'Chef Apollo'
})
const moreRecipes = Recipe.insertMany(data)

Promise.all([moreRecipes])
  .then(values => { 
    console.log("more recipes has been inserted");
    console.log(values);
  })
    .catch(err => console.error(err));

Recipe.updateOne({title:'Rigatoni alla Genovese'}, {duration: 100})
.then(res=>console.log('hmmm',res))
  .catch(err=>console.log(err))

  Recipe.deleteOne({title: 'Carrot Cake'})
  .then(res=>console.log('deleted',res))
  .catch(err=>console.log(err))
newRecipe.save((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Καλή όρεξη!');
  }
});


setTimeout(() => {
	mongoose.disconnect();
}, 1500)