const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model.js');
// Import of the data from './data.json'
const data = require('./data.json');

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
    return self.connection.dropDatabase();
  })

  // ITERATION 2
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: "Bechamel",
      level: "Easy Peasy",
      ingredients: ["Flour", "Butter", "Milk", "Salt", "Nutmeg"],
      cuisine: "French",
      dishType: "other",
      image: "",
      duration: 45,
      creator: "François Pierre de La Varenne",
    })
      .then(res => { console.log("The title is: ", res.title) })
      .catch((err) => { console.error("Some error occurred with Iteration 2: ", err) })
  })

  // ITERATION 3
  .then(() => {
    return Recipe.insertMany(data)
      .then(() => console.log("You saved some new recipes"))
      .catch((err) => { console.error("Some error occurred with Iteration 3: ", err) })
      .then(() => {
        data.forEach((res) => {
          console.log("The title of the recipe is: ", res.title)
        })
      })
      .catch((err) => { console.error("Some error occurred with Iteration 3: ", err) })
  })

  // ITERATION 4
  .then(() => {
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }) // Este método me sale deprecated
      .then((res) => console.log("You updated: ", res.title))
      .catch((err) => { console.error("Some error occurred with Iteration 4: ", err) })
  })

  // ITERATION 5
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" })
      .then((res) => console.log("You deleted: ", res.title)) // Return undefined, ¿Como puedo hacer que me retorne el título?
      .catch((err) => { console.error("Some error occurred with Iteration 5: ", err) })
  })

  // ITERATION 6
  .then(() => {
    return mongoose.connection.close(() => {
      console.log("The Database it´s closed.")
    })
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
