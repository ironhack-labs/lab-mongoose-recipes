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
    //return self.connection.dropDatabase();
  })
  .then(() => {
    //****ITERATION 2****
    // (async () => {
    //   try {
    //     const recipes = await Recipe.create({
    //     title:"canelones",
    //     cuisine:"italiana"
    //     }); 
    //     console.log(`This recipe was saved: ${recipes.title}`);
    //     return recipes;
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // })();
      // Run your code here, after you have insured that the connection was made
// //****ITERATION 3****
      // (async () => {
      //   try {
      //     const allRecipes = await Recipe.insertMany(data);
      //     console.log(allRecipes.map(acc => console.log(acc.title))); 
      //   } catch (error) {
      //     console.log(error.message);
      //   }
      // })();
//****ITERATION 4****
        // (async () => {
        //   try {
        //     const filter = { title: "Rigatoni alla Genovese" };
        //     const update = { duration: 100 };
        //     const updated = await Recipe.findOneAndUpdate(filter, update);
        //     console.log(`Succesfully updated`);
        //   } catch (error) {
        //     console.log(error.message);
        //   }
        // })();
//****ITERATION 5****
(async () => {
  try {
    const deletedRecipe = await Recipe.deleteOne({ title: 'Carrot Cake' }, function (err) {});;
  } catch (error) {
    console.log(error.message);
  }
})();

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
  
  mongoose.connection.close();