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

    const recipeCake = {
      title: "Cheesecake",
      level: "Easy Peasy",
      ingredients: ["eggs", "sugar", "milk", "flour", "biscuits"],
      cuisine: "french",
      dishType: "dessert",
      duration: 40,
      creator: "Jamie Oliver",
      created: '2020-01-21'
    }
    return Recipe.create(recipeCake)
  })
  .then(recipeFromDB => {
    //console.log(recipeFromDB)
    console.log("your cheesecake is ready")


    return Recipe.insertMany(data)
  })

  .then(RecipesInDb => {
   //console.log(RecipesInDb)
    RecipesInDb.forEach(
      recipe => {
        console.log(recipe.title)
      }
    )

    return Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"},{duration:100})
  })

  .then(replyFromDb => {
    console.log ("Rigatoni was updated")

   return Recipe.deleteOne({title: "Carrot Cake"})
  }) 

  .then(messageFromDb =>{
    console.log("Carrot Cake was deleted")
  })

  mongoose.connection.close()

  .catch(error => {
    console.error('Error connecting to the database', error);
  });

