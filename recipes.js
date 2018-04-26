const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')
const recipeSchema = require('./schema/recipeSchema.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });



const Recipe = mongoose.model('Recipe', recipeSchema);

Recipe.create({title: "chicken", level: 'Easy Peasy', ingredients: ['chicken'],
 cousine: 'International', dishType: ['Dish'], duration: 9, creator: "Me"})
  .then((recipe) => { console.log('New recipe added: ', recipe.title) })
  .catch((err) => { console.log(err)} );

Recipe.insertMany(data)
.then((recipe) => { console.log('New recipe added: ', data.title) })
.catch((err) => { console.log(err)} );

setTimeout(() => {
  Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  .then((recipe) => { console.log('change duration!!!') })
  .catch((err) => { console.log(err)} )

  Recipe.deleteOne({title: 'Carrot Cake'})
  .then((recipe) => { console.log('Carrot Cake deleted :(') })
  .catch((err) => { console.log(err)} )

}, 1000);

setTimeout(() => {
  mongoose.connection.close()
}, 3000)

