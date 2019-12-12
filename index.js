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


/*Recipe.create({
  title: "Karottensuppe",
  level: "Easy Peasy",
  ingredients: ["Karotten", "Zwiebeln", "Ingwer", "Chilli", "Butter", "Currypulver", "Gemüsebrühe", "Kokosmilch", "Salz", "Pfeffer"],
  cuisine: "Asiatisch",
  dishType: "Dish",
  image: "https://www.edeka.de/media/01-rezeptbilder/rezeptbilder-i-p/rez-edeka-karottensuppe-mit-ingwer-rezept-i-p.jpg?imwidth=470&imdensity=1",
  duration: 35,
  creator: "Malte"
})
.then(recipeFromDb => {
  console.log(`A new recipe was created: ${recipeFromDb.title}`)
})
.catch(error => {
  console.log(`Couldn\'t create recipe error: ${error}`)
});


Recipe.insertMany(data)
.then(recipeFromDb => {
  recipeFromDb.forEach(recipe => {
  console.log(`A new recipe was created: ${recipe.title}`)
  })
})
.catch(error => {
  console.log(`Couldn\'t create recipe error: ${error}`)
});
*/

Recipe.where({title: "Rigatoni alla Genovese"}).update({duration: 100})
.then(recipeFromDb => {
  console.log(`Recipe was updated`)
})
.catch(error => {
  console.log(`Couldn\'t update recipe: ${error}`)
});
