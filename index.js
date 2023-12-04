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
    const newRecipe = {
      title: "Jollof Rice",
      level: "UltraPro Chef",
      ingrdients: ["Tomato", "Potato"],
      cuisine: "Ghanaian",
      dishType: "breakfast",
      
      duration: 45,
      creator: "Chef Franklin"
    }

    return Recipe.create(newRecipe)

  })
    .then((createdRecipe) =>{
      console.log(createdRecipe.title)

      //Iteration 3
     return Recipe.insertMany(data)
    })

    .then(insertedRecipes => {
      
      insertedRecipes.forEach(recipe => console.log(recipe.title))

        //Iteration 4
      return  Recipe.findOneAndUpdate (
          {title: "Rigatoni alla Genovese"},
          {duration: 100},
          {new: true}
        )
      
    })
    .then(updatedRecipe => {
      //Iteration 5
      console.log ("Successful Updated recipe")
       return Recipe.deleteOne (
        {title: "Carrot Cake"}
      )

    })

    .then((deletedRecipe) => {

      //Iteration 6 
     console.log ("Successfully removed Carrot Cake")
     return mongoose.disconnect()

    })


  .catch(error => {
    console.error('Error connecting to the database', error);
  });
 








