const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

const myFirstRecipe = {
  title: "Pozole",
  level: "Amateur Chef",
  ingredients: [
    "1/2 kilogram pork meat",
    "A lot of corn",
    "Love",
    "2 liters of water",
    "salt to taste"
  ],
  cuisine: "Mexican",
  dishType: "Dish",
  image: "",
  duration: 40,
  creator: "Chef MiAbuelita"
};

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

//INSTRUCTIONS:
// AFTER RUN THE FIRST TIME WITH COMMAND: node index.js,
// COMMENT THE CURRENT STEP1, MOVE FORWARD TO THE NEXT STEP, AND UNCOMMENT.
// DO THIS PROCESS EACH TIME YOU RUN node index.js

// Comentar y descomentar
function executeSteps() {
  step1();
  // step2();
  // step3();
  // step4();
  // step5();
  // step6();
}

executeSteps();

//STEP 1: Comment if you have already inserted myFirstRecipe
function step1() {
  Recipe.create(myFirstRecipe)
    .then(recipe => console.log(`Se agregó receta de: ${recipe.title}`))
    .catch(err => console.log(err));
}

// //STEP 2: Find a document in db which title is Pozole, show the title data field od the document
function step2() {
  Recipe.find({ title: "Pozole" })
    .then(receta => console.log(`Resultado de busqueda: ${receta[0].title}`))
    .catch(err => console.log(err));
}
// // STEP 3: Insert many recipes
function step3() {
  Recipe.insertMany(data)
    .then(recipes =>
      recipes.forEach(recipe => {
        console.log(`Inserted new recipe: ${recipe.title}`);
      })
    )
    .catch(err => console.log(err));
}

// // //STEP 4: Update  Rigatoni alla duration to => 100
function step4() {
  Recipe.findOneAndUpdate(
    { title: "Rigatoni alla Genovese" },
    { duration: 100 }
  )
    .then(updatedRecipe => {
      console.log(
        `${updatedRecipe.title} recipe has been successful updated!!`
      );
    })
    .catch(err => console.log(err));
}

// //STEP 5 Remove Carrot Cake recipe
function step5() {
  Recipe.deleteOne({ title: "Carrot Cake" })
    .then(() => console.log("Delete completed"))
    .catch(err => console.log(err));
}

// //STEP 6 Connection close
function step6() {
  mongoose.connection.close();
}
