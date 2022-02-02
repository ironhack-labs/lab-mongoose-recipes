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
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    Recipe
      .create({
        title: 'Tortilla de patata',
        level: 'Easy Peasy',
        ingredients: ['papa', 'huevos', 'aceite', 'cebolla', 'sal'],
        cuisine: 'spanish',
        dishType: 'breakfast',
        image: 'https://www.google.com/search?q=tortilla+de+patatas&rlz=1C1CHBD_esES915ES915&sxsrf=APq-WBuIB7aslkmARxpGb6nu7fcsgRoa3A:1643818625128&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiXx-bJteH1AhXuxoUKHWhhC5YQ_AUoAXoECAIQAw&biw=680&bih=655&dpr=1.25#imgrc=Yi4C-LnByeMR9M',
        duration: 15,
        creator: 'unknown',
        created: Date(),
      })
      .then(newRecipe => {
        console.log(`Se ha creado una nueva receta con nombre`, newRecipe.title)
        return Recipe.create(data)
      })

      .then(alltheRecipes => {
        alltheRecipes.forEach(recipes => console.log('These are all the recipes name:', recipes.title))
        return Recipe.find()
      })

      .then(()=>{
        return Recipe
        .find()
          .updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 }, {new:true} )
          .then(info => console.log("Los detalles de la modificación son:", info))
      })

      .then(() =>{
        return Recipe
        .find()
        .deleteOne({title: 'Carrot Cake' })
          .then(info => console.log('Se han eliminado', info.deletedCount, 'receta/s'))
      })

      .catch(err => console.log('Hubo un error...', err))
    })

  .catch(error => {
    console.error('Error connecting to the database', error);

  });

  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination')
    process.exit(0)
  })

