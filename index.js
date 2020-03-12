const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));
//2
// Recipe.create({
//     title: 'Salmon w orange',
//     level: 'Easy Peasy',
//     ingredients: ['salmon', 'orange'],
//     cuisine: 'seafood',
//     dishType: 'Dish',
//     image: 'https://myhealthydish.com/wp-content/uploads/2014/10/IMG_5804-1024x768.jpg',
//     duration: '20',
//     creator: 'Carrie'
//   },
//   function (err, Recipe) {
//     if (err) {
//       console.log('An error happened:', err);
//     } else {
//       console.log('The recipe is saved and its title is: ', Recipe.title);
//     }
//   });
//3
Recipe.insertMany(data, (err, recipes) => {
  if (err) {
    console.log('An error happened:', err);
  } else {
    data.forEach(element =>
      console.log('The recipe is saved and its title is: ', element.title)
    )
  }
});
//4
// Recipe.findOneAndUpdate({
//     title: 'Rigatoni alla Genovese'
//   }, {
//     duration: 100
//   },
//   function (err, Recipe) {
//     if (err) {
//       console.log('An error happened:', err);
//     } else {
//       console.log('This recipe is updated: ', Recipe.title);
//     }
//   }
// );
//5
// Recipe.deleteOne({
//     title: 'Carrot Cake'
//   },
//   function (err, Recipe) {
//     if (err) {
//       console.log('An error happened:', err);
//     } else {
//       console.log('This recipe is deleted.');
//     }
//   });
//6
// mongoose.connection.close()