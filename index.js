const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
    return Recipe.collection.drop()
  })
  .then(x => Recipe.create({ title: "Tortilla de Patatas", level: "Amateur Chef", ingredients: ["12 Huevos", "Aceite", "Patatas", "Sal", "Pimienta"], cuisine: "Española", dishType: "Dish", image: "https://www.cocinacaserayfacil.net/wp-content/uploads/2018/01/Tortilla-de-patatas-light.jpg", duration: 20, creator: "unknow", created: '1817-01-01' }))
  .then(x => console.log(`La receta ${x.title} ha sido creada`))
  .then(x => Recipe.insertMany(data))
  .then(elm => {
    elm.forEach(e => { console.log(e.title) })
  })
  .then(TheRecipe => {
    return Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  })
  .then(x => { console.log("La receta ha sido actualizada") })
  .then(x => {
    return Recipe.deleteOne({ title: "Carrot Cake" })
  })
  .then(x => { console.log("La Receta ha sido eliminada") })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });
process.on('SIGINT', () => { mongoose.connection.close(() => { console.log('Mongoose default connection disconnected through app termination'); process.exit(0); }); });
