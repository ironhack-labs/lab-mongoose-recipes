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

    // Iteration #2

    const tortilla = {
      title: "Tortilla Españolas",
      level: "Amateur Chef",
      ingredients: ["huevos", "patatas", "cebolla", "sal", "aceite de oliva"],
      cuisine: "Española",
      dishType: "other",
      image: "",
      duration: 40,
      creator: "Rodrigo",
    };
    Recipe.create(tortilla)
      .then((response) =>
        console.log(`The title of the recipe is ${response.title}`, response)
      )
      .catch((error) => {
        console.error("Error creating recipe", error);
      });

      // Iteration #3

    Recipe.insertMany(data)
      .then((response) =>
        response.forEach((recipe) => {
          console.log(recipe);
        })
      )
      .catch((err) => console.error("Error insertMany", err));

})

.catch((error) => {
  console.error("Error connecting to the database", error);
});

// Iteration #4

Recipe.findOneAndUpdate(
  { title: 'Rigatoni alla Genovese' }, 
  { duration: 100 },
  { new: true }
)
  .then((response) => console.log("Updated successfully!", response))
  .catch((err) => console.error("Error insertMany", err));

  // Iteration #5

  Recipe.deleteOne(
    { title: "Carrot Cake" }
  )
    .then((response) => console.log("Deleted successfully!", response))
    .catch((err) => console.log(err)); 

    // Iteration #6
    mongoose.disconnect();


  