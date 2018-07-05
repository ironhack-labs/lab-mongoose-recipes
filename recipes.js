const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

const recipeSchema = new Schema({
  title : {type: String, required: true, unique: true},
  level : {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients: [String],
  cousine: {type: String, required: true}, 
  dishType: {type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
  image: {type: String, default: "https://images.media-allrecipes.com/images/75131.jpg."},
  duration: {type: Number, min: 0},
  creator: String,
  created: {type: Date, default: Date.now}
});

const Recipe = mongoose.model('Recipe', recipeSchema);

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
    mongoose.connection.close()
  .then(() => {
    console.log('Disonnected from Mongo!')
  })
  .catch((err) => {
    console.error('Error disconnecting from Mongo', err)
  });
  }).catch((err) => {
    console.error('Error connecting to mongo', err)
  });


// const recipe = new Recipe ({   //creating a new recipe
//     title : 'Thai Red Curry with Vegetables',
//     level : 'Amateur Chef',
//     ingredients: [ '1 ¼ cups brown jasmine rice or long-grain brown rice, rinsed',
//       '1 tablespoon coconut oil or olive oil',
//       '1 small white onion, chopped (about 1 cup)',
//       'Pinch of salt, more to taste',
//       '1 tablespoon finely grated fresh ginger (about a 1-inch nub of ginger)',
//       '2 cloves garlic, pressed or minced',
//       '1 red bell pepper, sliced into thin 2-inch long strips',
//       '1 yellow, orange or green bell pepper, sliced into thin 2-inch long strips',
//       '3 carrots, peeled and sliced on the diagonal into ¼-inch thick rounds (about 1 cup)',
//       '2 tablespoons Thai red curry paste',
//       '1 can (14 ounces) regular coconut milk',
//       '½ cup water',
//       '1 ½ cups packed thinly sliced kale (tough ribs removed first), preferably the Tuscan/lacinato/dinosaur variety',
//       '1 ½ teaspoons coconut sugar or turbinado (raw) sugar or brown sugar',
//       '1 tablespoon tamari or soy sauce',
//       '2 teaspoons rice vinegar or fresh lime juice'],
//     cousine:'Thai',
//     dishType:'Dish',
//     image: "https://cookieandkate.com/images/2015/10/thai-red-curry-recipe-with-vegetables-1-1-550x757.jpg",
//     duration: 40,
//     creator: "Kathryne",
//     created: Date("10/20/2015")
  
// });

// recipe.save()
// .then((response)=>{
//     console.log(response);
// })
// .catch((error)=>{
//     console.log(error);
// })

// Recipe.insertMany(data)  // adding all the recipes from the data.js file
// .then((docs)=>{
//   console.log(docs);
// })
// .catch((error)=>{
//   console.log(error);
// });


// Recipe.deleteOne({ title: "Carrot Cake"}) //deleting the Carrot Cake =''''(
// .then((response)=>{
//      console.log("yay you have deleted it!");
//   })
// .catch((error)=>{
//      console.log(error);
//   });

