const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

// create()

const miojoRecipe = {
  title: 'MiojoScript',
  level: 'UltraPro Chef',
  ingredients: ['miojo'],
  cuisine: 'niponic',
  dishType: 'Dish',
  duration: 3,
  creator: 'Chef Fernando',
}

Recipe.create(miojoRecipe).then( createReturnOfOnFulfilled => console.log('new recipe: ', createReturnOfOnFulfilled)).catch((err) => console.log(err))

// seed
const handleFulfiledProm = theArrayIamExpecting => {
  theArrayIamExpecting.forEach(e => console.log(e));
};

const prom1 = Recipe.insertMany(data)
  .then(handleFulfiledProm)
  .catch(err => console.log('erro: '));

// update
const prom2 = Recipe.updateOne(
  { title: 'Rigatoni alla Genovese' },
  { duration: 100 }
)
  .then(toma => console.log('update successul!', toma))
  .catch(err => console.log(err));

// delete
const prom3 = Recipe.deleteOne({ title: 'Carrot Cake' })
  .then(fullfiledDeleteOne => console.log('deleted: ', fullfiledDeleteOne))
  .catch(err => console.log(err));

Promise.all([prom1, prom2, prom3])
  .then(() => {
    mongoose.connection.close()
    .then(() => console.log('conexao fechada'));
  })
  .catch(function(err) {
    console.log(err);
  });
// nao pode deixar sincrono.
// mongoose.connection.close()
