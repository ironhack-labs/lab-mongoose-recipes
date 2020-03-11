const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

Recipe.create({
  title: 'Orange and Milk-Braised Pork Carnitas',
  level: 'UltraPro Chef',
  ingredients: ['3 1/2 pounds boneless pork shoulder, cut into large pieces', '1 tablespoon freshly ground black pepper', '1 tablespoon kosher salt, or more to taste', '2 tablespoons vegetable oil', '2 bay leaves', '2 teaspoons ground cumin', '1 teaspoon dried oregano', '1/4 teaspoon cayenne pepper', '1 orange, juiced and zested'],
  cuisine: 'American',
  dishType: 'Dish',
  image: 'https://images.media-allrecipes.com/userphotos/720x405/2280918.jpg',
  duration: 160,
  creator: 'Chef John'
})
// Connection to the database "recipeApp"

Recipe.insertMany(data)
  .then(recipe => {recipe.map(data => console.log(data.title))})
  .catch(err => console.error('Error', err));

Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  .then(x => console.log("done"))
  .catch(err => console.log(err));


Recipe.deleteOne({title:'Carrot Cake'})
  .then(x => console.log("done"))
  .then(() => mongoose.disconnect())
  .catch(err => console.log(err));


mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));
