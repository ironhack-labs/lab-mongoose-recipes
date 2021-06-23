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

  .then(() => {
    return Recipe.syncIndexes()
  })

  // .then(() => {

  //   Recipe.create({

  //     title: "Asian Glazed Chicken Thighs",
  //     level: "Amateur Chef",
  //     ingredients: [
  //       "1/2 cup rice vinegar",
  //       "5 tablespoons honey",
  //       "1/3 cup soy sauce (such as Silver Swan®)",
  //       "1/4 cup Asian (toasted) sesame oil",
  //       "3 tablespoons Asian chili garlic sauce",
  //       "3 tablespoons minced garlic",
  //       "salt to taste",
  //       "8 skinless, boneless chicken thighs"
  //     ],
  //     cuisine: "Asian",
  //     dishType: "main_course",
  //     image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
  //     duration: 40,
  //     creator: "Chef LePapu"
  //   }
  //   )
  //     .then(theNewRecipe => console.log('¡La nueva receta fué creada!:', theNewRecipe))
  //     .catch(err => console.log("Hubo un error!", err))
  // })

  .then(() => {

    return Recipe

      .create([...data])
      .then(theNewRecipes => console.log('las nuevas recetas ya están listas:', theNewRecipes))
      .catch(error => console.log('error aquí', error))

  })


  .then(() => {

    return Recipe

      .findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { $set: { duration: 100 } }, { new: true })
      .then(theNewDuration => console.log('duration is now ok at:', theNewDuration))
      .catch(error => console.log('Error connecting to the database', error)

      )
  })

  .then(() => {

    return Recipe
      .deleteOne({ _id: '60d35dca43bc3d0360d5529f' })

      .then(carrotDeleted => console.log('Recipe deleted is:', carrotDeleted))
      .catch(error => console.log('Error connecting to the database', error)
      )
  })

  .then(() => {
    mongoose.disconnect()
  })
