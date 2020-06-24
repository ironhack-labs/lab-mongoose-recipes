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
    Recipe
      .create({
        title: "Eggs Benedict",
        level: 'Easy Peasy',
        dishtype: 'breakfast',
        image: src = "https://www.bbcgoodfood.com/sites/default/files/recipe/recipe-image/2019/02/eggs-benedict-pancakes.jpg",
        duration: 30,
        creator: "Rodrigo",
      })
      .then(newRecipe => console.log('La nueva receta es:', newRecipe))
 
  .then(() => {Recipe.create(data)
  .then((recipe) => { recipe.forEach((element) => console.log(`Estas son las ultimas recetas ${element.title}`)) })
  })

  .then(() => Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true } ))
  .then(recipe => console.log('Actualizada la duracion de', recipe))
  .then(() => Recipe.deleteOne({ title: 'Carrot Cake' }, { new: true }))
  .then(recipeDeleted => console.log('La receta eliminada es', recipeDeleted))
  .then(() => mongoose.connection.close())

  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  });
  

