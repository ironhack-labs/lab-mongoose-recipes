const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

// mongoose.connect('mongodb://localhost/recipeApp')
//   .then(() => {
//     console.log('Connected to Mongo!')
//   }).catch(err => {
//     console.error('Error connecting to mongo', err)
//   });
  mongoose.disconnect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('DisConnected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });
  


  const recipeSchema = new Schema ({
    title: {type: String, required: true, unique: true},
    level: {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
    ingredients: Array, 
    cousine: {type: String, required: true},
    dishType: {type: String, enum: ['Breakfast','Dish','Snack','Drink','Dessert','Other']},
    image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
    duration: {type: Number, min: 0},
    creator: String,
    created: {type: Date, default: '07/05/2018'}
});


const newRecipe = mongoose.model ('newRecipe', recipeSchema);

// newRecipe.create ({ 
//   title: 'Asian Glazed Chicken Thighs',
//   level: 'Amateur Chef',
//   ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
//   cousine: 'Asian',
//   dishType: ['Dish'],
//   image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
//   duration: 40,
//   creator: 'Chef LePapu'
// })
// .then ((newRecipe) => {
//   console.log ('it works');
//   })
// .catch ((error) => {
//   console.log (error);
//   });





  // newRecipe.insertMany([
  //   { 
  //     title: 'Asian Glazed Chicken Thighs',
  //     level: 'Amateur Chef',
  //     ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
  //     cousine: 'Asian',
  //     dishType: ['Dish'],
  //     image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  //     duration: 40,
  //     creator: 'Chef LePapu'
  //   },
  //   { 
  //     title: 'Orange and Milk-Braised Pork Carnitas',
  //     level: 'UltraPro Chef',
  //     ingredients: ['3 1/2 pounds boneless pork shoulder, cut into large pieces', '1 tablespoon freshly ground black pepper', '1 tablespoon kosher salt, or more to taste', '2 tablespoons vegetable oil', '2 bay leaves', '2 teaspoons ground cumin', '1 teaspoon dried oregano', '1/4 teaspoon cayenne pepper', '1 orange, juiced and zested'],
  //     cousine: 'American',
  //     dishType: ['Dish'],
  //     image: 'https://images.media-allrecipes.com/userphotos/720x405/2280918.jpg',
  //     duration: 160,
  //     creator: 'Chef John'
  //   },
  //   { 
  //     title: 'Carrot Cake',
  //     level: 'Amateur Chef',
  //     ingredients: ['6 cups grated carrots', '1 cup brown sugar', '1 cup raisins', '4 eggs', '1 1/2 cups white sugar', '1 cup vegetable oil', '2 teaspoons vanilla extract', '1 cup crushed pineapple, drained', '3 cups all-purpose flour', '1 1/2 teaspoons baking soda', '1 teaspoon salt', '4 teaspoons ground cinnamon'],
  //     cousine: 'International',
  //     dishType: ['Dessert'],
  //     image: 'https://images.media-allrecipes.com/userphotos/720x405/3605684.jpg',
  //     duration: 130,
  //     creator: 'Chef Nadia'
  //   },
  //   { 
  //     title: 'Rigatoni alla Genovese',
  //     level: 'Easy Peasy',
  //     ingredients: ['2 pounds red onions, sliced salt to taste', '2 (16 ounce) boxes uncooked rigatoni', '1 tablespoon chopped fresh marjoram leaves', '1 pinch cayenne pepper', '2 tablespoons freshly grated Parmigiano-Reggiano cheese'],
  //     cousine: 'Italian',
  //     dishType: ['Dish'],
  //     image: 'https://images.media-allrecipes.com/userphotos/720x405/3489951.jpg',
  //     duration: 220,
  //     creator: 'Chef Luigi'
  //   },
  //   { 
  //     title: 'Chocolate Chip Cookies',
  //     level: 'Amateur Chef',
  //     ingredients: ['1/2 cup light brown sugar', '1 large egg', '2 tablespoons milk', '1 1/4 teaspoons vanilla extract', '2 cups semisweet chocolate chips'],
  //     cousine: 'French',
  //     dishType: ['Dish'],
  //     image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  //     duration: 30,
  //     creator: 'Chef Jennifer'
  //   }
  // ])
  // newRecipe.insertMany(data)
  // .then ((newRecipe) => {
  //   })
  // .catch ((error) => {
  //   });

  // newRecipe.updateOne ({ title: "Rigatoni alla Genovese"}, { duration: "100" })
  // .then ((newRecipe) => {
  //   })
  // .catch ((error) => {
  
  //  });

  // newRecipe.remove ({title: "Carrot Cake"})
  // .then ((newRecipe) => {
  //       })
  // .catch ((error) => {
  //  });

  
