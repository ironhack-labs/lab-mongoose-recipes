const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app-async';

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
    dealRecipes();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

//--------------------------------
// Async / await

// async function dealRecipes() {
//   try {
//     await Recipe.create({
//       title: 'Quiche',
//       level: 'Easy Peasy',
//       ingredients: ['Butter', 'Lardons', 'Butter', 'Flour'],
//       cuisine: 'French',
//       dishType: 'main_course',
//       duration: 72,
//       creator: 'Florian',
//     });
//     await Recipe.insertMany(data)
//       .then((dbResponse) => {
//         dbResponse.forEach(recipe => console.log(recipe.title));
//       })
//     await Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true})
//       .then((dbResponse) => {
//         console.log('Duration successfully updated!')
//       })
//     await Recipe.deleteOne({title: "Carrot Cake"}, {new: true})
//       .then((dbResponse) => {
//         console.log('The item carrot cake has been succesfully deleted!');
//       })
//   } catch (dbError) {
//     console.log(dbError);
//   } finally {
//     mongoose.connection.close(() => {
//     console.log('Mongoose default connection disconnected through app termination');
//     });
//   }
// }

async function dealRecipes() {
  try {
    await Recipe.create({
      title: 'Quiche',
      level: 'Easy Peasy',
      ingredients: ['Butter', 'Lardons', 'Butter', 'Flour'],
      cuisine: 'French',
      dishType: 'main_course',
      duration: 72,
      creator: 'Florian',
    });
    const insertedRecipes = await Recipe.insertMany(data)
    insertedRecipes.forEach(recipe => console.log(recipe.title));
    const updatedRecipe = await Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true})
    console.log(`The cooking time of ${updatedRecipe.title} has been successfully updated!`)
    const deletedRecipe = await Recipe.deleteOne({title: "Carrot Cake"}, {new: true})
    console.log(`The item Carrot Cake has been succesfully deleted!`);
    } catch (dbError) {
      console.log(dbError);
    } finally {
      mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination');
      });
    }
}

//------------------------------
// Previous nester Promises version -> then hell!

// mongoose
//   .connect(MONGODB_URI, {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(self => {
//     console.log(`Connected to the database: "${self.connection.name}"`);
//     // Before adding any documents to the database, let's delete all previous entries
//     return self.connection.dropDatabase();
//   })
//   .then(() => {
//     Recipe.create({
//       title: 'Quiche',
//       level: 'Easy Peasy',
//       ingredients: ['Butter', 'Lardons', 'Butter', 'Flour'],
//       cuisine: 'French',
//       dishType: 'main_course',
//       duration: 72,
//       creator: 'Florian',
//     })
//   .then(() => {
//     Recipe.insertMany(data)
//       .then(dbResponse => {
//         dbResponse.forEach(recipe => console.log(recipe.title));
//         Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true})
//           .then((dbResponse) => {
//             console.log(`Duration successfully updated!`);
//             Recipe.deleteOne({title: "Carrot Cake"}, {new: true})
//               .then((dbResponse) => {
//                 console.log(`The item carrot cake has been succesfully deleted!`);
//                   mongoose.connection.close(() => {
//                   console.log('Mongoose default connection disconnected through app termination');
//                 });
//               })
//               .catch((dbErr) => {
//                 console.log(dbErr);
//               });
//           })
//           .catch((dbErr) => {
//             console.log(dbErr);
//           });
//       })
//       .catch(dbErr => {
//       console.log(dbErr);
//       });
//   })
//   .catch(error => {
//     console.error('Error connecting to the database', error);
//   })