const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

async function queue(){
  await mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));
  let create = await Recipe.create(data[Math.floor(Math.random() * 1)])
  .then(console.log('Entrada creada correctamente'))
  .catch(error => console.log(error));
  let insert = await Recipe.insertMany(data)
  .then(console.log('Array insertado correctamente'))
  .catch(error => console.log(error));
  let update = await Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, {ordered: false})
  .then(console.log('Actualizado corectamente'))
  .catch(error => console.log(error));
  let remove = await Recipe.deleteOne({ title: "Carrot Cake"})
  .then(console.log('Carrot Cake borrado correctamente'))
  .catch(error => console.log(error));
  let disconnect = await mongoose.disconnect()
  .then(console.log('Conexión cerrada correctamente'));
}

queue();
