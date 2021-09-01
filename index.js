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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => Recipe.syncIndexes())
  .then(() => {

    // Run your code here, after you have insured that the connection was made
    // Recipe
    // .create({
    //   title: "Tortilla de patata",
    //   level: "Amateur Chef",
    //   ingredients: [
    //     "patatas",
    //     "aceite",
    //     "cebolla",
    //     "amor"
    //   ],
    //   cuisine: "Española",
    //   dishType: "main_course",
    //   image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
    //   duration: 40,
    //   creator: "Sergio el chef"
    // })
    // .then(newRecipeFromDB => console.log('La nueva receta es', newRecipeFromDB) )

    Recipe
    // Creamos las recetas
    .create()
    .then(() => Recipe.create(data))

    // Sacamos los titulos de las recetas añadidas
    .then(recipes => recipes.forEach ((recipe) => console.log('Se crearon las siguientes recetas', recipe.title)))

    // Encontramos la receta y modificamos la duración
    .then(() => Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100}))
    .then(recipe => console.log('Se modificó la receta:', recipe.title , 'Con la duración de', recipe.duration))

    // Borramos la receta que ya no tiene que estar en la BD
    .then(() => Recipe.deleteOne({title: 'Carrot Cake'}))
    .then(recipe => console.log('Receta eliminada'))

    // Cerramos la BD
    .then(() => mongoose.connection.close())

  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
