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

    exports.createRecipe = (req, res) => {
      Recipe.create({
        title: 'Rigatoni alla Genovese',
        level: 'Easy Peasy',
        ingredients: ['2 pounds red onions, sliced salt to taste', '2 (16 ounce) boxes uncooked rigatoni', '1 tablespoon chopped fresh marjoram leaves', '1 pinch cayenne pepper', '2 tablespoons freshly grated Parmigiano-Reggiano cheese'],
        cuisine: 'Italian',
        dishType: 'Dish',
        image: 'https://images.media-allrecipes.com/userphotos/720x405/3489951.jpg',
        duration: 220,
        creator: 'Chef Luigi'
        });
      res.redirect("/");
    };
