const mongoose = require('mongoose');
const Recipe = require('./models/recipe-model'); // Import of the model Recipe from './models/Recipe'
const recipes = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


const recipe =({
  title : 'bizcochito',
  level :  'Easy Peasy',
  ingredients : ['sugar','chocolate','nuts'],
  cuisine : 'desserts',
  dishType : 'Dessert',
  duration : 30,
  creator : 'Patricia',
})

Recipe.create(recipe)
.then((recipe) => {//iteracion 2
  console.log(recipe.title)
  return Recipe.insertMany(recipes)
})
.then((recipes)=> {//iteracion 3
  for(let recipe of recipes){
    console.info(recipe.title)
  }
  return Recipe.findOneAndUpdate({ title: 'Boghart'},{$set: {duration:30}},{new:true})
})
.then((recipe)=>{//iteracion 4
  console.info('==== iteracion 4')
  return Recipe.findOneAndRemove({title:'bizcochito'})
})
.then((recipe) =>{//iteracion 5
  console.info('==== iteracion 5');
  console.info(`${recipe.title} successfully removed!`);
})
.catch(error => console.error(error))
.then(() => {
  console.info('==== deleting database');
  return mongoose.connection.dropDatabase()
})
.then(() => {
  console.info('==== Closing database');
  return mongoose.connection.close() 
})
.catch(error => console.error(error));

