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
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made

     Recipe.create({
      title: 'chicken curry',
      level: 'Easy Peasy',
      ingredients: ['chicken', 'onion', 'pepper', 'carrot', 'rice', 'soya', 'salt', 'coconut milk', 'curry'],
      cuisine: 'indian',
      dishType: 'main_course',
      image: "https://t2.rg.ltmcdn.com/es/images/4/1/3/pollo_al_curry_hindu_facil_72314_600.jpg",
      duration: 60,
      creator: 'Pablo de Tuero',

    })
    .then(newRecipe => console.log(newRecipe))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
  //Recetas del data.json

  Recipe
    .create(data)

    .then(newData => console.log('Los nuevos elementos creados:', newData.title))

    //Actualiza rigatoni

    .then(() => Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' }, 
      { duration: 100 }, 
      { new: true }
    ))
    .then(rigatoni => console.log('Actualiza la duración de', rigatoni.title))

    // Borrar el carrot cake

    .then(() => Recipe.deleteOne(
      {title: 'Carrot Cake'}
    ))
    .then(disappear => console.log('Ya no venemos', disappear.title))

    //desconectar

    .then(()=> mongoose.connection.close(() => console.log('Mongoose Disconect')))

    .catch(err => console.log('Hubo un error', err))
  
  