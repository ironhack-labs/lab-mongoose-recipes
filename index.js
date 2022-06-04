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
    //return Recipe.deleteMany() ==> Comentado para la iteracion 4
  })
//Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'},{duration:100})
Recipe.deleteOne({title:'Carrot Cake'})
.then(() => {
    // Run your code here, after you have insured that the connection was made
	  //ITERACION 2: return Recipe.create(data[0]);
	  //ITERACION 3: Recipe.insertMany(data)
	  //ITERACION 4: Linea 18 y el console.log.
	 // ITERACION 5: Linea 19 y el console.log
	  console.log('La base de datos ha sido actualizada exitosamente :D')
	  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

	//ITERACION 3 linea 22 y 29-31
/* Recipe.find({title:{$exists:true}},{title:1})
	  .then(titulos=>console.log('Los titulos son: ',titulos))
	  .catch(error=>console.log("Surgio un error: ",error))
*/
