const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost:27017/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

const newRecipe = {
  title : 'My first Recipe',
  level : 'Easy Peasy',
  ingredients: ['water','fridge'],
  cuisine: 'Internacional',
  dishType: 'Other',
  duration : 60,
  creator: 'God',
};

  // Recipe.create(new Recipe(newRecipe))
  // .then(recipe =>{console.log(receipe.title)})

  // Recipe.insertMany(data)
  //   .then(recipes => {
  //     for(let i =0;i<recipes.length;i++)
  //       console.log(recipes[i].title)
  //   })

  // Recipe.findOne({title:'Rigatoni alla Genovese'})
  //   .then(async recipe => {
  //     recipe.duration =100
  //     await recipe.save()
  //   })

  
  // Recipe.deleteOne({title:'Carrot Cake'})
  //   .then( () => console.log('Delete completed'))