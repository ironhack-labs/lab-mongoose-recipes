const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const Chef = require('./models/Chef');
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

let newChef = new Chef({
  name: 'Michaela',
  sex: 'female',
  age: 36
});

Chef.create(newChef)
  .then((Chef) => console.log(Chef.name, "has been created."))
  .catch(console.log("Error, chef couldn't be added to the list."));


let newRecipe = new Recipe({
  title: 'Goulash',
  level: 'UltraPro Chef',
  ingredients: ['3 1/2 pounds boneless beef, cut into small pieces', '1 tablespoon freshly ground black pepper', '1 tablespoon kosher salt, or more to taste', '2 tablespoons vegetable oil', '2 teaspoons ground cumin', '1/4 teaspoon cayenne pepper'],
  cuisine: 'Hungarian',
  dishType: 'Dish',
  image: 'https://kuchynalidla.sk/img/SK/653x414/20190710064142-10263%2011592%20-%20lidl%20Kuchyna%20KW29%20OBRAZOK%20HLAVNY%20RECEPT%20653x414.jpg',
  duration: 240,
  creator: 'Chef Michaela'
});


Recipe.create(newRecipe)
  .then((Recipe) => console.log(Recipe.title, "succesfully created!"))
  .catch(console.log("Error, recipe could not be added to the list."))

Recipe.insertMany(data)
  .then(response => data.forEach(recipes => console.log('Recipe title: ', recipes.title)))
  .catch(error => console.log('Error, recipes could not be retrieved from the list', error));

Recipe.updateOne({
    title: 'Rigatoni alla Genovese'
  }, {
    duration: 100
  })
  .then(response => console.log('Update successful!'))
  .catch(error => console.log('Error, update was not successful.'));

Recipe.deleteMany({
    title: 'Carrot Cake'
  })
  .then(response => console.log('Removal successful!'))
  .catch(error => console.log('Error, removal was not successful.'));

setTimeout(() => {
  mongoose.connection.close()
    .then(() => {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    }).catch(err => console.log("the error when closing connection : ", {
      err
    }))
}, 1000);