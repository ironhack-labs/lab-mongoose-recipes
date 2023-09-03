const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: "Pasta al Pesto",
      level: "Amateur Chef",
      ingredients: [
       "300 g de pasta",
       "80 ml de aceite de oliva",
       "Sal y pimienta",
       "1 ramita de albahaca",
       "50 g de queso parmesano",
       "50 g de piñones",
       "2 dientes de ajo",
      ],
      cuisine: "Italian",
      dishtype: "main_course",
      image: "https://www.lavanguardia.com/files/og_thumbnail/uploads/2020/05/29/5ed11fb61d750.jpeg",
      duration:30,
      creator: "Chef Luigi",
    });
  })
 .then((recipe) => {
   console.log(`Created Recipe: ${recipe.title}`);
  })
 .catch(error => {
    console.error('Error connecting to the database', error);
});
// Insertar múltiples recetas en la Db//
Recipe.insertMany(data)
.then((recipes) => {
  recipes.forEach((recipe) => {
    console.log(`Inserted recipe: ${recipe.title}`);
  });
})
.catch((error) => {
  console.error('Error inserting recipes to the database:', error);
});

// Actualizar la duración de la receta//
Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  .then(() => {
    console.log('Successfully updated the recipe duration.');
  })
  .catch((error) => {
    console.error('Error updating the recipe:', error);
});
//Borrar una receta de la Db//
Recipe.deleteOne({ title: 'Carrot Cake' })
  .then(() => {
    console.log('Successfully removed the Carrot Cake recipe.');
  })
  .catch((error) => {
    console.error('Error removing the recipe:', error);
});
//Cerrar la Bd//
mongoose.connection.close(() => {
  console.log('Database connection closed.');
});
