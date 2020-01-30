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
 Recipe.create({ 
  title: 'Hot dog',
  level: 'Easy Peasy',
  ingredients: ['8 salchichas viena','8 panes para hot dog','al gusto Mayonesa','al gusto Catsup','al gusto Salsa o chiles en escabeche'],
  image: 'https://img-global.cpcdn.com/recipes/d47004c4148acee1/751x532cq70/hot-dog-sencillos-foto-principal.jpg',
  duration: 20,
  creator: 'Chef Isra'
 })
.then(Recipe => console.log(`Title of Recipe: ${Recipe.title}`))
.catch(error =>
  console.log('Error', error)
)

Recipe.insertMany(data)
  .then(Recipe => console.log(`Title of Recipe: ${Recipe.title}`, Recipe))
  .catch(error => console.log('Error: ', error))



  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err))
