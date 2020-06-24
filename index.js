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

    return Recipe

      .create({

        "title": "Chicken",
        "level": "Amateur Chef",
        "ingredients": [
          "500g chicken thighs",
          "1 lemon juiced",
          "1 cup raisins",
          "2 tsp paprika",
          "200g natural yogurt",
        ],
        "cuisine": "International",
        "dishType": "main_course",
        "image": "",
        "duration": 45,
        "creator": "Jennifer Joyce"
      })

      .then(newRecipes => console.log('Los nuevos elementos creados:', newRecipes))
      .catch(err => console.log('Hubo un error', err))



      .then(() => {

        return Recipe
          .insertMany(data)
          .then((newRecipes) => {
            newRecipes.forEach((elem) => console.log(`Added ${elem.title}`))
          })
      })

      .then(() => {

        return Recipe
          .findOneAndUpdate({
            duration: 100
          }, {
            duration: 110
          }, {
            useFindAndModify: false
          })
          .then(updateRecipe => {
            console.log(updateRecipe)

          })
      })
      //OTROS MÉTODOS A USAR, TENÍA PROBLEMAS CON LOS DEPRECATED, ASÍ QUE HE PROBADO VARIOS.

      // .then(() => {
      //   Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })

      //   .then(updated => {
      //       console.log("updated successfully", updated)
      //     })
      //     .catch(error => {
      //       console.log(error);

      // })

      // })

      // .then(() => {
      //   Recipe.findByIdAndUpdate('5ef37b8ebb4524a9395f76db', {
      //     duration: 100
      //   }, { useFindAndModify: false })

      //   .then(updated => {
      //     console.log("updated successfully", updated)
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   })

      //   })

      .then(() => {

        return Recipe

          .deleteOne({
            title: "Carrot Cake"
          })
          .then(deleteRecipe => {
            console.log(deleteRecipe)
          })

      })
      .then(() => {
        return mongoose.connection.close(() => {
          console.log("connection closed successfully");
        })

      })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });