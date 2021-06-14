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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

  .then(() => {
    // Iteration 2
    return Recipe.create({
      title: "Crepes",
      level: "Easy Peasy", 
      ingredients: ["milk", "flour", "eggs", "sugar"],
      cuisine: "French",
      dishType: "breakfast",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT84d-rFhmPVQeBiNmBKWXmJIxyROpgjQaxug&usqp=CAU",
      duration: 20,
      creator: "Andrei"
    })
  })

  .then((recipe)=> {
      console.log(`"${recipe.title}" has been added to database`)
    // Iteration 3
      return Recipe.insertMany(data);
  })

  .then((recipes) => {
      recipes.forEach((recipe) => 
      console.log(`"${recipe.title}" has been added to database`));
    // Iteration 4
      return Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" }, 
        { duration: 100 },
        { new: true}
      )
  })

  .then(() => {
      console.log(`"${recipe.title}" has been updated`);
    // Iteration 5
      return Recipe.deleteOne({ title: "Carrot Cake"}); 
  })

  .then(() => {
    console.log(`"${recipe.title}" has been deleted`)
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  })

  .finally(() => {
    mongoose.connection.close(() => {
      console.log('Disconnected from database');
      process.exit(0)
    })
  })

