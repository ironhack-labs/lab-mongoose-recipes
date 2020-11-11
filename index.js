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
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    return Recipe
      .create([{ title: "Fabada Asturiana", cuisine: "Asturian", duration: 120, }])
      .then(newRecipe => {
        console.log(newRecipe[0].title)
        return Recipe.create(data)
      })
      .then(newRecipes =>
        newRecipes.forEach(elm => { console.log(elm.title) })
      )
      .then(() => {

        return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
          .then(details => console.log("Has actualizado los siguientes datos:", details))
          .catch(err => console.log('Hubo un error', err))

      })
      .then(() => {
        return Recipe
          .deleteOne({ title: "Carrot Cake" })
          .then(response => console.log("Has eliminado una receta:", response))
          .catch(err => console.log('Hubo un error', err))

          .catch(err => console.log('Error creando el registro:', err))
      })


  })

  .then(() => {
    return mongoose.connection.close()
      .then(() => console.log(`Connection closed!`))
      .catch(() => console.error('delete Failed'));

  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });




