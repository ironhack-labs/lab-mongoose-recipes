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
  // [AMN] Commented to avoid the Db to be deleted each time. 
  // .then(self => {
  //   console.log(`Connected to the database: "${self.connection.name}"`);
  //   // Before adding any documents to the database, let's delete all previous entries
  //   return self.connection.dropDatabase();
  // })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // [AMN-Start Iteration 2] To create one recipe (I use the data[0] instead of writing all the data)
      // let newRecipe = data[0];
      // Recipe.create(newRecipe, (error, recipe) => {
      //   if (error) {
      //     console.log("Something was wrong: ", error);
      //     return;
      //   }
      //   console.log("The recipe is saved and its title is: ", recipe.title);
      //   mongoose.connection.close();
      //   return;
      // });
    // [AMN-End] 
    // [AMN-Start Iteration 3] To create all the recipes in the json
      // let newArrRecipe = data;
      // Recipe.insertMany(newArrRecipe, (error, recipes) => {
      //   if (error) {
      //     console.log("Something was wrong: ", error);
      //     return;
      //   }
      //   for (let i = 0; i < newArrRecipe.length; i++) {
      //     console.log("The title " + i + " is: " + recipes[i].title);
      //   }
      //   mongoose.connection.close();
      //   return;
      // });
    //[AMN-End]
    //[AMN-Start Iteration 4] To update one recipe
      // const query = {title: "Rigatoni alla Genovese"};
      // const update = {duration: 100};
      // Recipe.findOneAndUpdate(query, update, {new: true}, (error, durUpdated) => {
      //   if (error) {
      //     console.log("Something was wrong: ", error);
      //     return;
      //   }
      //   console.log("The new duration is: ", durUpdated);
      //   mongoose.connection.close();
      //   return;  
      // });
    //[AMN-End]
    //[AMN-Start Iteration 5] To delete one recipe
      Recipe.deleteOne({title: "Carrot Cake"}, (error, deleted) => {
        if (error) {
          console.log("Something was wrong and the register wasn't deleted: ", error);
          return;
        }
        console.log("The register was deleted: ", deleted);
        mongoose.connection.close();
        return;
      });
    //[AMN-END]
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
  
