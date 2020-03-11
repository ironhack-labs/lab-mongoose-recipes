const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'
const data2 = {
  title: 'Tortilla Española',
  level: 'Amateur Chef',
  ingredients: ['5 huevos', '2 cucharadas de sal', '1 cebolla', '3 patatas', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
  cuisine: 'Española',
  dishType: 'Dish',
  image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  duration: 40,
  creator: 'Chef LePapu'
};

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));
  
 //con el metodo create vuelco el primer data generado manualmente
  Recipe.create(data2)
  .then(rec => {
    console.log('The user is saved and its value is: ', rec);
//con mongoose.connection cerramos el servidor
    mongoose.disconnect();
  })
  .catch(error =>
    console.log('An error happened while saving a new user:', error)
  );
//Y este el resto (podría utilizar el insertMany, pero hemos verificado que el create tmb los vuelca)
  Recipe.create(data)
  .then(rec => {
    console.log('The user is saved and its value is: ', rec);
//con mongoose.connection cerramos el servidor
    mongoose.disconnect();
  })
  .catch(error =>
    console.log('An error happened while saving a new user:', error)
  );


//con el metodo updateOne, buscamos el titulo y actualizamos la duracion
  Recipe.updateOne({title:"Rigatoni alla Genovese"},{duration:100})
  .then(rec => {
    console.log('Change duration: ', rec);
//con mongoose.connection cerramos el servidor
    mongoose.disconnect();
  })
  .catch(error =>
    console.log('An error happened while saving a new user:', error)
  );
  //Y con el ultimo metodo borramos buscando el titulo.
  Recipe.deleteOne({title:'Carrot Cake'})
  .then(rec => {
    console.log('Delete: ', rec);
//con mongoose.connection cerramos el servidor
    mongoose.disconnect();
  })
  .catch(error =>
    console.log('An error happened while saving a new user:', error)
  );

