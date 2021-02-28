const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const myFirstRecipe = {
  title: "Chocolate Mousse",
  level: "Easy Peasy",
  ingredients: ["Chocolate", "Eggs"],
  cuisine: "French",
  dishType: "dessert",
  duration: 25,
  creator: "John Doe",
}

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
  .then(async() => {
    const resFromDb = await Recipe.create(myFirstRecipe)
    console.log(resFromDb.title)
    const resFromDb2 = await Recipe.insertMany(data)
    resFromDb2.forEach((recipe) => {console.log(recipe.title)})
    const resFromDb3 = await Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true})
    console.log(resFromDb3)
    const resFromDb4 = await Recipe.deleteOne({title: "Carrot Cake"})
    console.log(resFromDb4)
    await mongoose.connection.close()
    console.log('Db is disconnected')

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
