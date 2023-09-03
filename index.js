const mongoose = require('mongoose');
// Import model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
// mongoose
//   .connect(MONGODB_URI)
//   .then(x => {
//     console.log(`Connected to the database: "${x.connection.name}"`);
//     // Before adding any recipes to the database, let's remove all existing ones
//     return Recipe.deleteMany()
//   })
//   .then(() => {
//     return Recipe.create(
//       {
//         title: 'Mango curry',
//         level: 'Amateur Chef',
//         ingredients: '["onion", "mango", "currey powder", "coconut milk"]',
//         cuisine: "Asian",
//         dishType: "main_course",
//         duration: 60,
//         creator: "Mum"
//       });
//   })
//   .then(recipeFromDB => {
//     console.log(`*** --> *** recipe: ${recipeFromDB}`)
//   })
//   .then(() => {
//     return Recipe.insertMany(data);
//   })
//   .then(recipesFromDB => {
//     console.log(`---- --> All recipes: ${recipesFromDB}`)
//   })
//   .then(() => {
//     return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { $set: { "duration": 100 } }, { new: true });
//   })
//   .then(updatedRecipe => {
//     console.log('The recipe was updated! ', updatedRecipe)
//   })
//   .then(() => {
//     return Recipe.deleteOne({ title: "Carrot Cake" });
//   })
//   .then(deletedRecipe => {
//     console.log('The recipe was deleted! ', deletedRecipe)
//   })
//   .catch(error => {
//     console.error('Error connecting to the database', error);
//   })
//   .finally(() => {
//     mongoose.disconnect();
//   })


// Connection to the database "recipe-app"
// mongoose
//   .connect(MONGODB_URI)
//   .then(x => {
//     console.log(`Connected to the database: "${x.connection.name}"`);
//     return Recipe.deleteMany()
//   })
//   .catch(error => {
//     console.error('Error connecting to the database', error);
//   });

// Recipe.create({
//   title: 'Mango curry',
//   level: 'Amateur Chef',
//   ingredients: '["onion", "mango", "currey powder", "coconut milk"]',
//   cuisine: "Asian",
//   dishType: "main_course",
//   duration: 60,
//   creator: "Mum"
// })
//   .then(recipeOne => console.log('The recipe is saved and its value is: ', recipeOne))
//   .catch(error => console.log('An error happened while saving:', error));

// Recipe.insertMany(data)
//   .then(allRecipes => console.log('The recipes are saved and values are: ', allRecipes))
//   .catch(error => console.log('An error happened while saving :', error));

// Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { $set: { "duration": 100 } }, { new: true })
//   .then(updatedOne => console.log('The recipe was updated ', updatedOne))
//   .catch(error => console.log('An error happened while udpating:', error));

// Recipe.deleteOne({ title: "Carrot Cake" })
//   .then(deletedOne => console.log('The recipe was deleted ', deletedOne))
//   .catch(error => console.log('An error happened while delected:', error));

// mongoose.disconnect()
//   .then((disconnect) => console.log('The recipe was updated ', disconnect))
//   .catch(error => console.log('An error happened while saving a new user:', error));

// With async /await
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected!!')
    return Recipe.deleteMany()
  } catch (err) {
    console.log('Failed to connect to MongoDB', err)
  }
}
createRecipe = async () => {
  try {
    const firstRecipe = await Recipe.create(
      {
        title: 'Mango curry',
        level: 'Amateur Chef',
        ingredients: '["onion", "mango", "currey powder", "coconut milk"]',
        cuisine: "Asian",
        dishType: "main_course",
        duration: 60,
        creator: "Mum"
      });
    return firstRecipe
  }
  catch (err) {
    console.log('There was an error:', err)
  }
}

addAllRecipes = async () => {
  try {
    const allRecipes = await Recipe.insertMany(data);
    console.log("Here are all 6 recipes added:", allRecipes);
    return allRecipes;
  }
  catch (err) {
    console.log('Could not add all recipes:', err)
  }
}
findOneUpdate = async () => {
  try {
    const toUpdate = await Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { $set: { "duration": 100 } }, { new: true });
    console.log("The recipe was updated", toUpdate);
    return toUpdate
  }
  catch (err) {
    console.log("Could not update:", err);
  }
}

deleteOne = async () => {
  try {
    const deletedOne = await Recipe.deleteOne({ title: "Carrot Cake" });
    console.log("Recipe deleted: ", deletedOne);
    return deletedOne;
  }
  catch (err) {
    console.log("Could not delete")
  }
}

disconnectDB = async () => {
  try {
    await mongoose.disconnect()
    console.log("Mongoose disconnected")
  }
  catch (err) {
    console.log("Could not disconnect")
  }
}
connectDB()
  .then(() => createRecipe())
  .then(() => addAllRecipes())
  .then(() => findOneUpdate())
  .then(() => deleteOne())
  .finally(() => disconnectDB())
  .catch(err => console.log("Err", err));