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

Recipe.create({title: 'Apple Pie', level: 'Easy Peasy', ingredients: ['1/2 cup sugar', '1/2 cup packed brown sugar', '3 tablespoons all-purpose flour', '1 teaspoon ground cinnamon', '1/4 teaspoon ground ginger', '1/4 teaspoon ground nutmeg'], cuisine: 'American', dishType: 'Dessert', image: 'https://www.tasteofhome.com/wp-content/uploads/2019/01/Beth-Howard-s-Apple-Pie_EXPS172400_CW132792D07_09_11b_RMS-696x696.jpg', duration: 60, creator: 'Taste of Home', created: ''});

Recipe.insertMany(data)
  .then((recipes) => {
    recipes.forEach((recipe) => {
      console.log(recipe.title);
    });
  })
  .catch(err => console.log(err));

  Recipe.updateOne({ title: 'Rigatoni alla Genovese'}, { duration:100 })
  .then((res) => {
      console.log('YAYYY', res);
  })
  .catch(err => console.log(err));

  Recipe.deleteOne({ title: 'Carrot Cake' })
  .then((res) => {
    console.log('YAYYY Delete', res);
})
.catch(err => console.log(err));

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});