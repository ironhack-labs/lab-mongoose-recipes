const mongoose = require('mongoose');
console.log("hola")

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"

mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    //mongoose.set('useFindAndModify', false);
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.syncIndexes()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create([
      {
        title: 'Hamburguesa de zanahoria',
        level: 'Easy Peasy',
        ingredients: ['zanahoria', 'soja', 'cebolla', 'ajo', 'perejil'],
        cuisine: 'vegetariana',
        image: 'https://mediolimon.org/wp-content/uploads/2020/03/hamburguesas-veganas-de-soja-texturizada-y-avena.png',
        duration: 30,
        creator: 'Kevin',
        created: Date.now()
      },
    ])
      .then(createdRecipy => {  /// createdBurguer es el argumento de la funcion de este then, y ese argumento recibe lo de Recipe.create, que es un array con todo lo que ha creado  
        console.log(createdRecipy[0].title)/// me devuelve un array con todo lo que ha creado el Recipe.create y hago un console.log, solo ha creado un elemento
        return Recipe.insertMany(data)///como ya no es una arrow function de una linea tengo que hacer un return para que lo reciba el siguiente then
      })
      .then(insertedRecipy => Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }))
      .then(updatedRecipy => Recipe.deleteOne({ title: 'Carrot Cake' }))
      .then(deletedRecipy => {
        mongoose.connection.close()
        console.log("entre en el close connection")
        ///// aqui si fuera a otro then habria que ponerle un return para que o recibiera el siguiente then.
      })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


   ////.then(algo => Recipe.insertMany(data))  aqui a Recipe, que es la base de datos le inserto data que es lo que viene del Json