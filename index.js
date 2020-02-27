const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

const recipe1 = {
  title: 'Pasta Pesto',
  level: 'Easy Peasy',
  ingredients: ['Spaghetti', 'Salt', 'Water', 'Pesto sauce', 'Parmigiano'],
  cuisine: 'Italian',
  dishType: 'Dish',
  image: 'https://recetasdecocinafaciles.net/wp-content/uploads/2016/11/Pasta-al-Pesto-1024x599.jpg',
  duration:'15',
  creator: 'Chef Gerard'
}

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
 
  .catch(err => console.error('Error connecting to mongo', err))
  
  .then(() => {
    return Recipe.create(recipe1)
    .then(console.log(`${recipe1.title} has been saved!`))
  })

  .then(() => {
    return Recipe.insertMany(data)
   })
      .then( recipes => {
        forEach( Recipe => {
          console.log(Recipe.title);
        });
  });


  