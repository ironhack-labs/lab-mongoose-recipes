const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return Recipe.deleteMany();
  })
  .then(() => {
    // iteration 2. newRecipe will be created in our DB
    return Recipe.create(newRecipe); // returning the promise allows us to resolve it in the next .then(), instead of nested promises.
  })
  .then((result) => {
    console.log(`recipe added: ${result.title}`); // a console.log to verify previous promise resolved correctly
    // iteration 3. all recipes in data will be inserted in our DB
    return Recipe.insertMany(data);
  })
  .then((result) => {
    result.forEach((item) =>
      console.log(`recipe for ${item.title} inserted successfully`)
    ); // a console.log to verify previous promise resolved correctly
    // iteration 4. To find a recipe by its title and update one attribute
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then((result) => {
    console.log(`The recipe ${result.title} is updated`); // a console.log to verify previous promise resolved correctly
    // iteration 5. To find a recipe by its title and delete it
    return Recipe.findOneAndDelete({ title: "Carrot Cake" });
  })
  .then((result) => {
    console.log(`The recipe ${result.title} is deleted`); // a console.log to verify previous promise resolved correctly
    // iteration 6. To close the DB.
    return mongoose.connection.close();
  })
  .then(() => console.log(`connection closed`)) // a console.log to verify previous promise resolved correctly
  .catch((err) => console.log(`an error has occurred: ${err}`)); // to catch errors in promises

//ASYNC ALTERNATIVE
/*
async function dataBaseManage() {

  try {

    let x = await mongoose.connect(MONGODB_URI)
    console.log(`Connected to the database: "${x.connection.name}"`);
    
    // Before adding any documents to the database, let's delete all previous entries
    await Recipe.deleteMany()
  
    // iteration 2. newRecipe will be created in our DB
    let createdRecipe = await Recipe.create(newRecipe)
    console.log(`recipe added: ${createdRecipe.title}`) // a console.log to verify previous promise resolved correctly
  
    // iteration 3. all recipes in data will be inserted in our DB
    let insertedRecipes = await Recipe.insertMany(data)
    insertedRecipes.forEach((eachRecipe) => console.log(`recipe for ${eachRecipe.title} inserted successfully`)); // a console.log to verify previous promise resolved correctly
  
    // iteration 4. To find a recipe by its title and update one attribute
    let updatedRecipe = await Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new:true })
    console.log(`The recipe ${updatedRecipe.title} is updated`) // a console.log to verify previous promise resolved correctly
  
    // iteration 5. To find a recipe by its title and delete it
    let deletedRecipe = await Recipe.findOneAndDelete({ title: "Carrot Cake" })
    console.log(`The recipe ${deletedRecipe.title} is deleted`) // a console.log to verify previous promise resolved correctly
  
    // iteration 6. To close the DB.
    await mongoose.connection.close()
    console.log(`connection closed`) // a console.log to verify previous promise resolved correctly

  } catch(err) {
    console.log(`an error has occurred: ${err}`); // to catch errors in promises
  }

}
*/
/* INSERT ONE RECIPE
const newRecipe = new Recipe(data[2]);

Recipe.create(newRecipe)
  .then((resp) => console.log(resp))
  .catch((err) => console.log(err));
*/

/* INSERT ARRAY
Recipe.insertMany(data)
  .then((resp) => console.log(resp))
  .catch((err) => console.log(err));
*/

/* UPDATE DURATION
Recipe.updateOne(
  { title: "Rigatoni alla Genovese" },
  {
    $set: { duration: 100 },
  }
).then(() => console.log("NEW DURATION"));
*/
/* DELETE RECIPE
Recipe.deleteOne({ title: "Carrot Cake" }).then(() => console.log("DELETED"));
*/
