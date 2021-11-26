const mongoose = require('mongoose');

const Recipe = require('./models/Recipe.model');
const data = require('./data');
const aRecipe = require('./aRecipe');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(self => {
    console.log(`Connected to the database: ${self.connection.name}`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    executeIterations()
    .then(() => console.log('All iterations have been properly executed!'));
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

// Async & await - no messages sent to console
//  ------------------------------------------
// async function executeIterations() {
//     try {
//       await Recipe.create(aRecipe);
//       await Recipe.insertMany( data );
//       await Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100});
//       await Recipe.deleteOne({ title: "Carrot Cake" });
//       await mongoose.connection.close();
//     } catch(err) {
//       console.log('Something went wrong: ', err);
//     }
// }

async function executeIterations() {
  try {
    // Iteration 2
    await Recipe.create(aRecipe);
    const theNewRecipe = await Recipe.find({}, {"_id" : 0, title : 1 }); 
    console.log('The new recipe: ', theNewRecipe);

    // Iteration 3
    console.log('Recipes added: ');
    await Recipe.insertMany( data );
    const theNewRecipies = await Recipe.find({ title : {$ne : "Blueberry Oatmeal Squares"}}, { "_id": 0, title : 1 });
    console.log(theNewRecipies);

    // Iteration 4
    await Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100});
    const theUpdatedField = await Recipe.find({ title: "Rigatoni alla Genovese" }, { "_id": 0, title : 1, duration: 1});
    console.log('The update has been successful: ', theUpdatedField);

    // Iteration 5
    await Recipe.deleteOne({ title: "Carrot Cake" });
    const theUpdate = await Recipe.find({}, { "_id": 0, title : 1 });
    console.log('The document has been successfully deleted: \n', theUpdate);

    // Iteration 6
    await mongoose.connection.close();
    console.log('The connection has been properly closed!');
  } catch(err) {
    console.log('Something went wrong: ', err)
  }
}

// Promises & then 
// ---------------
// Recipe.create(aRecipe)
// .then(theRecipe => {
//   console.log('The recipe is saved and its title is: ', theRecipe.title);
//   return Recipe.insertMany( data );
// })
// .then(theRecipes => {
//   let i = 1;
//   console.log('New recipes added: ')
//   theRecipes.forEach(aRecipe => {
//     console.log(`Recipe ${i}: ${aRecipe.title}`);
//     i++;
//   });
//   return Recipe.findOneAndUpdate(
//     { title: "Rigatoni alla Genovese" },
//     { duration: 100}
//   );
// })
// .then(() => {
//   console.log('The update has been successful!');
//   return Recipe.deleteOne({ title: "Carrot Cake" });
// })
// .then(() => {
//   console.log('The document has been successfully deleted!');
//   return mongoose.connection.close();
// })
// .then(() => {
//   console.log('The connection has been properly closed');
//   return;
// })