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

// Create
const insertOne = () => {
  Recipe.create({ title: 'Chocolate chip cookies',
                level: 'Easy Peasy',
                ingredients: [
                  '1/2 cup (113g) unsalted butter, melted',
                  '1/3 cup (66 g) granulated sugar',
                  '1/2 cup (104g) packed light brown sugar',
                  '1 large egg',
                  '1 teaspoon (5ml) vanilla extract',
                  '1/2 teaspoon baking soda',
                  '1/2 teaspoon salt',
                  '1 1/2 cups (186g) all-purpose flour',
                  '1 1/2 cups (255g) chocolate chips (semi-sweet or milk)',
                ],
                cuisine: 'American',
                dishType: 'Dessert',
                image: 'https://www.crazyforcrust.com/wp-content/uploads/2018/07/BEST-Chocolate-Chip-Cookie-recipe-3.jpg 640w, https://www.crazyforcrust.com/wp-content/uploads/2018/07/BEST-Chocolate-Chip-Cookie-recipe-3-500x749.jpg 500w',
                creator: 'Ivan Hernandez'
              })
  .then(recipe => { console.log('The recipe has been saved and its title is: ', recipe.title) })
  .catch(err => { console.log('An error happened: ', err) });
}


// Insert many
const insertMany = () => {
  Recipe.insertMany(data)
  .then(console.log('Data inserted succesfully'))
  .catch(err => { console.log('An error happened:', err) });
}

// Update
const updateRigatoni = () => {
  Recipe.updateOne({title : {$regex : ".*gatoni.*"}}, { duration: 100 })
  .then(recipe => { console.log(`${recipe.title} has been succesfully updated`) })
  .catch(err => { console.log('An error happened:', err) });
}

// Delete
const deleteCarrotCake = () => {
  Recipe.deleteOne({ title: "Carrot Cake"})
    .then(console.log('The delete has been succesfully executed'))
    .catch(err => { console.log('An error happened: ', err) });
}

// Execution
// insertOne();
// insertMany();
// updateRigatoni();
// deleteCarrotCake();

mongoose.connection.close();