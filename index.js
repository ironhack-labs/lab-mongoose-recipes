const mongoose = require("mongoose");

// ***** Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated.
mongoose.set(`useFindAndModify`, false);

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

const papasAlinas = {
  title: "Papas Aliñás",
  level: "Amateur Chef",
  ingredients: [
    "Patatas",
    "Sal",
    "Vinagre",
    "Atún en aceite de oliva",
    "Perejil",
    "Cebolla",
  ],
  cuisine: "Mediterranean",
  dishType: "main_course",
  duration: 30,
  creator: "Daniel",
};

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create(papasAlinas)
      .then((newRecipe) =>
        console.log(`A new recipe is created: ${newRecipe.title}!`)
      )
      .catch((err) => console.log(`Error while creating a new recipe: ${err}`))
      .then(() => Recipe.insertMany(data))
      .then(() =>
        Recipe.find({}).then((recipes) => {
          recipes.map((el) => console.log(el.title));
        })
      )
      // ***** Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated.
      .then(() =>
        Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 },
          { new: true }
        )
      )
      .then((recipe) =>
        console.log(
          `${recipe.title} was updated: (duration: ${recipe.duration})`
        )
      )
      .then(() => {
        Recipe.deleteOne({ title: 'Carrot Cake' })
        .then((recipe)=>  console.log(`${recipe.n} recipe deleted`))
        .then(()=>{
          mongoose.connection.close()
          console.log('Database closed!')
          process.exit(0)
         }) 
           
      })
      
 
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  })
  
