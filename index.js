const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.json'); // Import of the data from './data.js'
// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipeApp', {
    useNewUrlParser: true
  })
  .then(() => console.log('Connected to Mongo!'))
  .catch(err => console.error('Error connecting to mongo', err));


const lasagna = {
  title: "Lasagna",
  level: "UltraPro Chef",
  ingredients: ["pasta sheets", "minced meet", "vegetables", "bechamel", "love"],
  cuisine: "Italian",
  dishType: "main_course",
  image: "https://www.recetasdesbieta.com/wp-content/uploads/2018/10/lasagna-original.-860x380.jpg",
  duration: 120,
  creator: "Sergio",
}
/*.then(() => {*/
// Run your code here, after you have insured that the connection was made
//Añadimos 1 sola recipe 
/*Recipe.create(lasagna)
  .then(newRecipe => console.log(`Creating a new recipe: ${lasagna.title}.`))
  .catch(err => console.log(`Error at creating the lasagna`, err))*/

/*})*/
/*.then(() => {
  //Ahora varias recipes. insertMany se usa para añadir varios docuemntos a la vez
  //Las recetas están en un array en data.json
  //El parámetro de insertMany es el nombre del archivo que contiene esas recetas
  //Como es un array, iteramos con un forEach e imprimimos cada título
  Recipe.insertMany(data)
    .then(data.forEach(recipe => {
      //Se debe poner el elemento recipe en el console.log para que salgan los títulos
      console.log(`Creating a new recipe: ${recipe.title}`)
    }))
    .catch(err => console.log(`Error at inserting many recipes`, err))
})*/

//Encontramos un documento para actualizarlo
/*Recipe.findOneAndUpdate({
    title: "Rigatoni alla Genovese"
  }, {
    duration: 100
  }, {
    new: true
  })
  //Para comprobar que haya cambiado, hacemos un console.log
  .then(recipe => console.log(`Recipe updated`, recipe))
  .catch(err => console.log(`Error at updating the Rigatoni`, err))
*/

/*Recipe.deleteOne({
    title: "Carrot Cake"
  })
  .then(() => console.log(`Recipe deleted`))
  .catch(err => console.log(err))
  */

process.on('SIGINT', function () {
  Mongoose.connection.close(function () {
    console.log('Mongo Database disconnected through app termination');
    process.exit(0);
  });
});