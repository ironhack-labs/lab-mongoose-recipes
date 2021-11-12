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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    const newRecipe = {
      title: "Carne Porco Alentejana",
      level: "Amateur Chef",
      ingredients: ["Carne porco", "Batatas"],
      cuisine:  "Portuguese",
      dishType: "main_course",
      image: "https://i.ytimg.com/vi/moWlT9vXJnI/maxresdefault.jpg",
      duration: "30",
      creator: "David",
      created: new Date
    }
    return Recipe.create(newRecipe)
  })
  .then((createdRecipe) => {
    console.log('createdRecipe :>> ', createdRecipe);
    return Recipe.insertMany(data)
  })
  .then((allRecipes) => {
    allRecipes.forEach((titulo) => {
      console.log(titulo.title)
    })
    const pr = Recipe.find({title: "Rigatoni alla Genovese"});
    return pr
  })
  .then((foundRecipe) => {
    console.log('foundRecipe :>> ', foundRecipe);
    const pr = Recipe.findByIdAndUpdate(
      foundRecipe[0]._id,
      {duration: 100},
      {new: true}
    );
    return pr
  })
  .then((updatedRecipe) => {
    console.log('updatedRecipe :>> ', updatedRecipe);
    const pr = Recipe.deleteOne({title: "Carrot Cake"});
    return pr
  })
  .then((deletedRecipe) => {
    console.log('deletedRecipe :>> ', deletedRecipe);
    return mongoose.connection.close();
  })


  .catch(error => {
    console.error('Error connecting to the database', error);
  });
