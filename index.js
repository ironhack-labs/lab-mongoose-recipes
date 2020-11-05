const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
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
    return self.connection.dropDatabase();
  })

  //ITERATION 2- Create a recipe
  .then(() => {
    return Recipe.create({
      title: "Manti",
      level: "UltraPro Chef",
      ingredients: ["flour", "salt", "egg", "ground beef"],
      cuisine: "Turkish",
      dishType: "main_course",
      image: "https://i0.wp.com/turkishfoodchef.com/wp-content/uploads/2017/02/Turkish-Ravioli-Manti-Recipe.jpg",
      duration: 30,
      creator: "Ceyda",
    })
  })

  //ITERATION 3- Insert multiple recipes
  .then(recipe => {
    return Recipe.insertMany(data)
      .then((results) => console.log(`Saved new recipe: ${results}`))
      .catch((saveErr) => console.error(`Save failed: ${saveErr}`))
    console.log(recipe.title)
  })
  //ITERATION 4- Update recipe
  .then(recipe => {
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
      .then(() => console.log(`Duration is updated`))
      .catch((saveErr) => console.error(`Save failed: ${saveErr}`));
  })

//ITERATION 5- Remove a recipe
  .then(recipe => {
    return Recipe.deleteOne({ title: "Carrot Cake" })
    .then(() => console.log(`Carrot Cake is deleted`))
    .catch((saveErr) => console.error(`Save failed: ${saveErr}`))
  })

//ITERATION 6- Close the Database
  .then(recipe => {
  return mongoose.connection.close()
      .then(() => console.log(`Database is closed!`))
      .catch(() => console.error('Delete Failed'))
    })
    .catch (error => {
      console.error('Error connecting to the database', error)
    })
  
