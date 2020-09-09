const mongoose = require('mongoose');

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
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase()})
  //.catch(err => console.log('error connecting', err))
    
  //-------Iteración 2: Crear una nueva receta
  .then(() => {

  return Recipe.create({
    title: 'cachopo',
    ingredients:['ternera', 'jamon serrano', 'queso'],
    cuisine: 'asturiana',
    dishType: 'main_course',
    image: "https://recetasdecocina.elmundo.es/wp-content/uploads/2017/04/cachopo-asturiano.jpg",
    duration: 45,
    creator: 'Chef Ana'})
  })
  .then(newRecipe => console.log('el título de la nueva receta es', newRecipe.title))

  //-------Iteración 3: insertar multiples recetas
  .then(() => Recipe.insertMany(data))
  .then(data => data.forEach(elm => console.log(`${elm.title}`)))
      
  //-------Iteración 4: update 
  .then(() => Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true}))
  .then(newDuration => console.log('el nuevo tiempo de Rigatoni alla Genovese es', newDuration.duration))

  //-------Iteración 5: Remove
  .then(() => Recipe.deleteOne({title: 'Carrot Cake'}, console.log('La Receta no está disponible'))
  //.then(console.log('La Receta no está disponible'))

  .catch(error => {
    console.error('Error connecting to the database', error);
  });


//---------Iteración 6: cerrar database
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    })
})
