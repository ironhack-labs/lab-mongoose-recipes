const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create(
      {
        ingredients: [
          '1/2 cup light brown sugar',
          '1 large egg',
          '2 tablespoons milk',
          '1 1/4 teaspoons vanilla extract',
          '2 cups semisweet chocolate chips'
        ],
        image: 'https://previews.123rf.com/images/baibaz/baibaz1701/baibaz170100026/69479379-comida-sin-gluten-varias-pastas-y-harina-arroz-trigo-sarraceno-ma%C3%ADz-garbanzos-sobre-fondo-de-madera-de.jpg',
        created: null,
        title: 'Rodrigo\'s Chocolate Chip Cookies',
        level: 'UltraPro Chef',
        cuisine: 'Spanish',
        dishType: 'dessert',
        duration: 30,
        creator: 'Chef Rodrigo',
        
        }).then((recipe) => console.log(recipe.title))
  })
  .then(() => Recipe.insertMany(data))
  .then(data => data.forEach(element => {
    console.log(`${element.title}`);
  }))
  .then(() => Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, { new: true}))
  .then((recipe => console.log(`The duration of "${recipe.title}" has been updated to: "${recipe.duration}"`)))
  .then(() => Recipe.deleteOne({title: "Carrot Cake"}, function(err) {}))
  .then((recipe => console.log(`The recipe has been deleted`)))
  .then(() => mongoose.connection.close(true))
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  

  