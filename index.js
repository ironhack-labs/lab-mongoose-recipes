const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'


const nuevoElemento={
  title: 'Chocolate Princesa',
  level: 'Easy Peasy',
  ingredients: ['1/2 cup light brown sugar', '1 large egg', '2 tablespoons milk', '1 1/4 teaspoons vanilla extract', '2 cups semisweet chocolate chips'],
  cuisine: 'Mexicana',
  dishType: 'Dish',
  image: '',
  duration: 60,
  creator: 'Chef Fernanda'
}
// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
    .then(async()=>{
      console.log('Connected to Mongo!');
      const creaNuevo=await Recipe.create(nuevoElemento)
      console.log(creaNuevo.title);

     const creaNuevo2=await Recipe.create(data)
      creaNuevo2.forEach(e=>console.log(e.title))

      await Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese'}, { duration: 100 })
      console.log('lo has modificado')
      await Recipe.findOneAndDelete({ title: 'Carrot Cake'})
      console.log('se ha eliminado')
      mongoose.connection.close()
  }).catch(err => {
    console.error('Error connecting to mongo', err);
   
  });

