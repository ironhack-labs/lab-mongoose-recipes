const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://0.0.0.0:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(async () => {
    // Run your code here, after you have insured that the connection was made

    //Iteration 2
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
    //   })
    //     .then(recipe => console.log(recipe.title))
    //     .catch(err => console.log(err))
    // })

    //Iteration 3
    Recipe.insertMany(data)
      // .then(recipe => recipe.forEach(oneRecipe => console.log(`${oneRecipe.title}`)))
      // .catch(err => console.log(err))

      //Iteration 4
      // .then(() => {
      //   Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: "100" }, {new: true})
      //     .then(recipe => console.log("duration updated!"))
      //     .catch(err => console.log(err))
      // })

      //Iteration 5
      .then(() => {
        Recipe.deleteOne({ title: 'Carrot Cake' })
          .then(recipe => console.log("recipe deleted!"))
          .catch(err => console.log(err))
      })
      .then(() => {
        mongoose.connection.close();
      })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
