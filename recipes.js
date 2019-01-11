const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => { console.log('Connected to Mongo!');})
  .catch(err => { console.error('Error connecting to mongo', err);});

const recipesSchema = new Schema({
  title    : { type: String},
  level : { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients: {type: Array},
  cuisine: {type: Array, required:true},
  dishType: {type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
  image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type: Number, min: 0},
  creator: {type: String},
  created: {type: Date, default: Date.now}
});
const Recipe = mongoose.model('Recipe', recipesSchema);
// module.exports = Recipe;

Recipe.create({   
  title: 'Asian Glazed Chicken Thighs',
  level: 'Amateur Chef',
  ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
  cuisine: 'Asian',
  dishType: ['Dish'],
  image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  duration: 40,
  creator: 'Chef LePapu'
  })
  .then(recipe => { console.log('The recipe is saved and its value is: ', recipe);})
  .catch(err => { console.log('An error happened:', err);});

var recipes =     [
  {
    title: 'Asian Glazed Chicken Thighs',
    level: 'Amateur Chef',
    ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
    cuisine: 'Asian',
    dishType: ['Dish'],
    image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
    duration: 40,
    creator: 'Chef LePapu'
  },
  {
    title: 'Orange and Milk-Braised Pork Carnitas',
    level: 'UltraPro Chef',
    ingredients: ['3 1/2 pounds boneless pork shoulder, cut into large pieces', '1 tablespoon freshly ground black pepper', '1 tablespoon kosher salt, or more to taste', '2 tablespoons vegetable oil', '2 bay leaves', '2 teaspoons ground cumin', '1 teaspoon dried oregano', '1/4 teaspoon cayenne pepper', '1 orange, juiced and zested'],
    cuisine: 'American',
    dishType: ['Dish'],
    image: 'https://images.media-allrecipes.com/userphotos/720x405/2280918.jpg',
    duration: 160,
    creator: 'Chef John'
  },
  {
    title: 'Carrot Cake',
    level: 'Amateur Chef',
    ingredients: ['6 cups grated carrots', '1 cup brown sugar', '1 cup raisins', '4 eggs', '1 1/2 cups white sugar', '1 cup vegetable oil', '2 teaspoons vanilla extract', '1 cup crushed pineapple, drained', '3 cups all-purpose flour', '1 1/2 teaspoons baking soda', '1 teaspoon salt', '4 teaspoons ground cinnamon'],
    cuisine: 'International',
    dishType: ['Dessert'],
    image: 'https://images.media-allrecipes.com/userphotos/720x405/3605684.jpg',
    duration: 130,
    creator: 'Chef Nadia'
  },
  {
    title: 'Rigatoni alla Genovese',
    level: 'Easy Peasy',
    ingredients: ['2 pounds red onions, sliced salt to taste', '2 (16 ounce) boxes uncooked rigatoni', '1 tablespoon chopped fresh marjoram leaves', '1 pinch cayenne pepper', '2 tablespoons freshly grated Parmigiano-Reggiano cheese'],
    cuisine: 'Italian',
    dishType: ['Dish'],
    image: 'https://images.media-allrecipes.com/userphotos/720x405/3489951.jpg',
    duration: 220,
    creator: 'Chef Luigi'
  },
  {
    title: 'Chocolate Chip Cookies',
    level: 'Amateur Chef',
    ingredients: ['1/2 cup light brown sugar', '1 large egg', '2 tablespoons milk', '1 1/4 teaspoons vanilla extract', '2 cups semisweet chocolate chips'],
    cuisine: 'French',
    dishType: ['Dish'],
    image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
    duration: 30,
    creator: 'Chef Jennifer'
  }
];

// Recipe.insertMany(module.exports)
// .then(recipes => { console.log('The recipes are saved and they are: ', recipes) })
// .catch(err => { console.log('An error happened:', err) });

Recipe.insertMany(recipes)
  .then(rec => { console.log('The recipes are saved and they are: ', rec);})
  .catch(err => { console.log('An error happened:', err);});

Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
  .then(() => { console.log('The recipe is now updated!');})
  .catch(err => { console.log('An error happened:', err);});

Recipe.deleteOne({title:'Carrot Cake'})
  .then(() => { console.log('The recipe is deleted!');})
  .catch(err => { console.log('An error happened:', err);});

process.on('SIGINT', () => {  
  mongoose.connection.close(() => { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 