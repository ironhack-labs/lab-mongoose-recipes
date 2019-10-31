const mongoose = require('mongoose');
// Import of the model Recipe from './models/Recipe'
const Recipe = require('./models/recipe.model'); 
// Import of the data from './data.js'
const data = require('./data.js');  

require('./configs/db.config');


const recipe = {
  title: 'Quesillo',
  level: 'Easy Peasy',
  ingredients: ['250 g de harina de maíz', '1 g de sal', '1 g de azúcar', '50 g de harina de trigo', '2 dl de agua (o la que admita)', '1 kg de queso', '2 cebollas', 'Pimentón dulce', 'Sal', 'Pimienta', 'Cilantro'],
  cuisine: 'Venezuelan',
  dishType: 'Other',
  image: 'https://canalcocina.es/medias/_cache/zoom-77d8468c2d972ffa381ef1cc82e7b003-920-518.jpg',
  duration: 40,
  creator: 'Chumina Foster'
}

//Iteration 2 - Create a recipe
Recipe.create(recipe)

  //Insert Many recipes
  .then((recipe) => {
    console.info('========== Iteration 3');
    console.info('The recipe created is:', recipe.title)
    Recipe.insertMany(recipe)
  })
  
  //Update recipe
  .then((recipe) => {
    console.info('========== Iteration 4');
    Recipe.findOneAndUpdate(recipe, {title: 'Rigatoni alla Genovese'}, {duration: 100})
    console.info('Update Done')
  })

  //Remove a recipe
  .then((recipe) =>{
    console.info('========== Iteration 5');
    Recipe.deleteOne({title: 'Carrot Cake'})
    console.info('Delete Done')
  })

  .catch(err => { console.log('An error happened:', err) })

  //Close the Database
  .then(() => {
    console.info('========== Closing database...');
    mongoose.connection.dropDatabase()
    mongoose.connection.close()
  })

  .catch(err => { console.log('An error happened:', err) })
