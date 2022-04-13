const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');

const data = require('./data');

console.log(Recipe)




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
 
/*  .then(() => {
    Recipe
 .create({ title: 'Juanca Masala 2', level: 'UltraPro Chef', ingredients: 'Arroz', cuisine: 'India', dishType: 'main_course', image:'https://toque.world/img/wp-blog/uploads/2021/06/148672919_1337694966586333_1381278347226852579_n-819x1024.jpg',duration:'40',creator:'Juanca',created:''})
 .then(recipe=> console.log('La nueva receta es ',recipe.title))
 .catch(error => console.log('Hubo un error:', error))

  })*/
  .then(() => {
    console.log('insertando la data')
    return Recipe.insertMany(data)
  })
  .then(() => {
    console.log('Recortando duration de Rigatoni')
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: '100' });
  })
  .then(() => {
    console.log('borrandoooo')
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then(() => {
    console.log('desconectando.....')
    mongoose.disconnect();
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });





