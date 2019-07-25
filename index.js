const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })

Recipe.collection.drop()

 console.log('Connected to Mongo!')

  .then(() => {

    Recipe.create({ title: 'Paella', 
    level:"UltraPro Chef", 
    ingredients: ['arroz', 'agua', 'judias verdes', 'garrofó', 'tomate triturado', 'pollo', 'conejo', 'aceite de oliva', 'colorante'],
    cuisine : 'Valenciana',
    dishtype: 'Dish',
    image: "http://lacocinadebender.com/wp-content/uploads/2017/06/paella-valenciana.jpg",
    duration: 180,
    creator: 'Senyor Valenciá'
  }
  ,
  { title: 'gthrhhrrhe', 
    level:"UltraPro Chef", 
    ingredients: ['colorante'],
    cuisine : 'fdsgt',
    dishtype: 'Dish',
    duration: 10,
    creator: 'andreS'
  }
  )
  .then((recipes) => {
  
  
  
console.log(recipes)
    Recipe.insertMany(data)

      .then((recipes) => {
        console.log(recipes)
      })
          
  })
 
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

//   //iteration 3 recipe title
   
Recipe.updateMany({ title: 'Rigatoni alla Genovese'}, { durarion: 100  })
.then(recipeResults => console.log('Los resultados de la actualización son:', recipeResults))
.catch(err => console.log('¡OPS! Ha habido un error:', err))