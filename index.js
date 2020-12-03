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
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })

  .then(() => {
    // Run your code here, after you have insured that the connection was made
    //Iteration 2******************* */ create my recipe

    const crepe = {
      title: "Crepe",
      level: "Easy Peasy",
      ingredients: ["1 cup all-purpose flour", "1/2 cup milk", "1/2 cup water", "2 tablespoons butter, melted", "1/2 teaspoon salt"],
      cuisine: 'add all in a large mixing bowl, beat until smooth,.... ',
      dishType: "breakfast",
      image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-basic-crepes-vertical-1545245880.jpg?crop=1xw:1xh;center,top&resize=768:*",
      duration: 15,
      creator: "JILLIAN GUYETTE",
      created: "2019-12-20"
    }



    async function createCrepeRecipe() {

      await Recipe.create(crepe)
        .then(recipe => {
          console.log(" title recipe : ", recipe.title)
        })
        .catch(error => console.log("An error happened while saving a new user: ", error))
    };
    createCrepeRecipe();
    // > db.recipes.find(); check in mongo compass

  })


  .then(() => {
    //Iteration 3  *****************Insert recipes from data.json

    async function insertRecipes() {
      await Recipe.insertMany(data)
        .then((data) => {
          data.map(each => console.log(" title recipe : ", each.title))

          //Iteration 4, delete
          updateRecipe();

          // Iteration 5 - Remove a recipe
          deleteCarrotRecipe();
        })
        .catch(error => console.log("here insertRecipes", error))
    }

    insertRecipes();

    // > db.recipes.find({},{title:1, _id:0});)
  })


  .catch(error => {
    console.error('Error connecting to the database', error);
  });


// *****************Iteration 4 - Update recipe
async function updateRecipe() {
  await Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { $set: { duration: 100 } }, { new: true })
    .then(update => console.log(update.title + " recipe takes " + update.duration + " min to cook"))
    .catch(error => console.log("here insertRecipes", error))
}
// db.recipes.find({title:"Rigatoni alla Genovese"}, {duration:1, _id:0})
// db.recipes.findOneAndUpdate({ title: "Rigatoni alla Genovese"}, {$set: { duration: 100 } });


// **************Iteration 5 - Remove a recipe
async function deleteCarrotRecipe() {
  Recipe.deleteOne({ title: 'Carrot Cake' })
    .then(() => console.log(`Carrot cake recipe deleted  successfully`))
    .catch(error => console.log("here insertRecipes", error))
}
// db.recipes.deleteOne({ title: 'Carrot Cake' })

// *************Iteration 6 - Close the Database
function closeDatabase() {
  setTimeout(async () => {
    await mongoose.connection.close()
    .then(() => {
      console.log("connection closed")
      process.exit(0);
    })
  }, 5000);

}
closeDatabase();