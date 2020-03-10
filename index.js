const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

let newRecipe = {
        title: 'Pasta Pesto ',
        level: 'Amateur Chef',
        ingredients: ['Penne Pasta', 'Basil', ' Parmesan cheese', 'Pine nuts', 'Garlic'],
        cuisine: 'Italian',
        dishType: 'Dish',
        image: 'https://www.recipetineats.com/wp-content/uploads/2019/02/Pesto-Pasta_0.jpg',
        duration: 30,
        creator: 'Chef le Chelsey'
}

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

  Recipe.create(recipe)
  .then(recipe => console.log(` ${recipe.title}`));

  Recipe.create(data)
  .then(recipe => console.log(recipe.title))
  .then(() => Recipe.insertMany(data))
  .then( () => Recipe.find({}, {title:1}).then(recipes => {console.log(recipes)}))
  .then( () => Recipe.updateOne({title:"Rigatoni alla Genovese"}, {duration: 100}).then(console.log("Updated")))
  .then( () => Recipe.deleteOne({title:"Carrot Cake"}).then(console.log("Updated")))
  .then(() => mongoose.connection.close())
  .catch(error =>
    console.log('error', error)
  );

  // Recipe.create(newRecipe)
  // .then(result => console.log('This is the Pasta Pesto recipe'))
  // .catch(error => console.log('there is a problem'));  

  // Recipe.insertMany(data)
  // .then( result => console.log('look at all these recipes'))
  // .catch( error => console.log('error'));
// Recipe.updateOne({title:'Rigatoni alla Genovese'}, {duration: 100})
// .then(result => console.log('Welldone'))
// .catch(error => console.log('error'));