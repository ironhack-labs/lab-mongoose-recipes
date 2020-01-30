const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

const cake = {title: "Fondant", level: "Easy Peasy", cuisine: "italienne", creator: "Coline"};

// Connection to the database "recipeApp"
async function createRecipes() {
  try {
    const startDataBase = await mongoose.connect('mongodb://localhost/recipe-app-dev', {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Promise1");
    const createCake = await Recipe
    .create(cake).catch(err => console.log(err)
    );
    console.log("Promise2");
    const insertAll = await Recipe
    .insertMany(data)
    .catch(dbErr => console.log(`not inserted`, dbErr));
    console.log("Promise3");
    const updateCake = await Recipe
    .updateOne({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true})
    .catch(dbErr => console.log(`not inserted`, dbErr));
    console.log("Promise4");
    const deleteCake = await Recipe
    .deleteOne({title: "Carrot Cake"})
    .catch(dbErr => console.log(`not inserted`, dbErr));
    console.log("Promise5");
    const closeDB = mongoose
    .connection.close()
    .catch(err => console.log("There was an erros when closing the database"));
    console.log("Promise6");
  }
  catch(err) {
    console.log(err);
  }
}

createRecipes();

//2nd option with promises (not ordered)


//  mongoose
//   .connect('mongodb://localhost/recipe-app-dev', {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
//   .catch(err => console.error('Error connecting to mongo', err));


// Recipe
//   .create(cake)
//   .then(dbRes => console.log(cake.title))
//   .catch(dbErr => console.log(dbErr));

// Recipe
//  .insertMany(data)
//  .then(dbRes => console.log(data.title))
//  .catch(dbErr => console.log(`not inserted`, dbErr));

//  Recipe
//  .updateOne({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true})
//  .then(dbRes => console.log("successfull"))
//  .catch(dbErr => console.log(`not inserted`, dbErr));

//  Recipe
//  .deleteOne({title: "Carrot Cake"})
//  .then(deletedRecipe => console.log("successfully deleted reciper"))
//  .catch(dbErr => console.log(`not inserted`, dbErr));

//  mongoose
// .connect.close()
// .then(res => console.log("database succesffuly closed"))
// .catch(err => console.log("There was an erros when closing the database"))


