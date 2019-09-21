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

  //code mio

  mongoose
  .connect("mongodb://localhost/recipeApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x =>
    console.log(`Conectado a la base de datos ${x.connections[0].name}`)
  )
  .catch(err => console.log(err));

  const receta = new receta(
  {
    title: 'torta de tamal',
    level: 'Ultra Chef',
    ingredients: ['bolillo', 'tamal'],
    cuisine: 'Mexican',
    dishType: 'Dish',
    image: 'https://fotos.e-consulta.com/guajolotas.jpg',
    duration: 5,
    creator: 'Chilango'
  })
  // cerrar base de datos
  mongoose.connection.close();
