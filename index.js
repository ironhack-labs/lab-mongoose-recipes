const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { findByIdAndUpdate } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    //return Recipe.deleteMany()
  })
  .then(() => Recipe.syncIndexes())
  .then(() => {

    

    Recipe  
    
    .create({
      title: 'pancakes',
      level: 'Easy Peasy',
      ingredients: '150 g de harina de trigo de todo uso, 2 huevos medianos, 25 g de azúcar blanquilla (también vale panela), 50 g de mantequilla, 200 ml. de leche entera, Unas gotas de esencia de vainilla, 12 g de levadura en polvo (levadura química o polvo de hornear), Una pizca de sal fina (2 gramos), Para acompañar: Miel, jarabe de Arce, mantequilla, crema de chocolate, Nutella, Nocilla...',
      cuisine: 'Americana',
      dishType: 'dessert',
      image:'https://www.recetasderechupete.com/wp-content/uploads/2019/10/Bandeja-de-tortitas-768x527.jpg',
      duration: 25,
      creator: 'Laura',
    }) 
    .then((newDessert)=> console.log("Postre",newDessert.title))

    .then.insertMany(data,{ new: true })
    .findByIdAndUpdate('61fab4913de340b74f21f787', { duration: 100}, { new: true })
    .deleteOne({ title: 'Carrot Cake' })
    
    .catch(err=> console.log ('ERROR DE MONGOOSE ----', err))   
    .connection.close()

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

