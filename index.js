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

// const promise1 = Recipe.create(new Recipe({
//   title: 'Vai cavalo',
//   level: 'Amateur Chef',
//   ingredients: ['cavalo', 'vontade'],
//   cuisine: ['Brasileira'],
//   dishType: 'Dish',
//   duration: 50,
//   creator: 'Andre Talpo'
// }));

const recipes = data.map((element) => new Recipe(element));
const promise2 = Recipe.insertMany(recipes, (err, response) => {
  if (err) console.log('Deu ruim');
  else console.log('Sucesso demais');
});

const promise3 = Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, (err, response) => {
  if (err) console.log('Deu ruim');
  else console.log('Sucesso demais');
});

const promise4 = Recipe.deleteOne({ title: 'Carrot Cake' }, (err, response) => {
  if (err) console.log('Deu ruim.');
  else console.log('Sucesso demais.');
})

Promise.all([promise2, promise3, promise4])
.finally(() => {
  mongoose.connection.close();
  console.log('Fechado');
});