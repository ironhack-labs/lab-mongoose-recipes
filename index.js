const mongoose = require('mongoose'); // requiero la conexion a la base de datos

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
    return Recipe.deleteMany() // borro las recetas
  })
  .then(() => {
    return Recipe.syncIndexes()
  })

  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe
      .create({
        title: 'pastel', level: "Easy Peasy", ingredientes: ["agua", "harina", "azucar"],
        cuisine: "internacional", dishType: "breakfast", image: "https://images.media-allrecipes.com/images/75131.jpg",
        duration: 10, creator: "Pablo", created: "2021/06/23 "
      })
      .then(() => {
        return Recipe
          .create(data)
          .then(recipe => console.log('las recetas son:', recipe))
      })

      .then(() => {
        return Recipe
          .findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { $set: { duration: 100 } }, { new: true })
          .then(theNewDuration => console.log('la nueva duracion es:', theNewDuration))


      })

      .then(() => {
        return Recipe.deleteOne({ title: 'Carrot Cake' })

      })
      .then(() => {
        mongoose.disconnect()
      })

  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
