const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => Recipe.syncIndexes())
  .then(() => {
    return Recipe.create({
      title: 'Alcachofitas',
      level: 'UltraPro Chef',
      ingredients: ['Alcachofas pequeñas', 'Más alcachofas', 'Just alcachofas'],
      cuisine: 'Mi cuisine',
      dishType: 'breakfast',
      image: 'enlace.jpg',
      duration: 19,
      creator: 'Tyler the creator',
      created: Date.now()
    })
  })
  .then(() => {
    Recipe.create(data)
  })
  .then(() => {
    return Recipe
      .find()
      .select('title')
  })
  .then((recipes) => console.log(recipes))
  .then(() => Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }))
  .then(() => console.log('Hemos actualizado la recetitaaaaa'))
  .then(() => Recipe.findOneAndDelete({ title: "Carrot Cake" }))
  .then(() => console.log('Hemos borrado la tarta de zanahoria, con lo que me gusta lol'))
  .then(() => mongoose.connection.close())
  .catch(error => {
    console.error('Error connecting to the database', error);
  });









     //   {name: 'Lacón con granizada',
      //   level: 'Easy Peasy',
      //   ingredients: ['Lacón', 'Granizada', 'Creo que es obvio'],
      //   cuisine: 'Heladería Yoli',
      //   dishType: 'main_course',
      //   image: 'enlace2.jpg',
      //   duration: 2,
      //   creator: 'El hijo de Tyler the creator',
      //   created: Date.now()
      // },
      // {
      //   name: 'El bizcochito de la máquina',
      //   level: 'Amateur Chef',
      //   ingredients: ['Una máquina expendedora', 'Bollería industrial', 'Dinero'],
      //   cuisine: 'Risi',
      //   dishType: 'breakfast',
      //   image: 'enlace3.jpg',
      //   duration: 6,
      //   creator: 'El nieto de Tyler the creator',
      //   created: Date.now()
      // },
      // {
      //   name: 'Batido de proteínas',
      //   level: 'UltraPro Chef',
      //   ingredients: ['Proteínas', 'Agua', 'Shaker'],
      //   cuisine: 'Gymbros',
      //   dishType: 'soup',
      //   image: 'enlace4.jpg',
      //   duration: 7,
      //   creator: 'El bisnieto de Tyler the creator',
      //   created: Date.now()
      //   }