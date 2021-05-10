const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

mongoose.set('useFindAndModify', false);

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
  .then(async () => {
    // Run your code here, after you have insured that the connection was made
    const recipe = await Recipe.create({
      title: "Basic cookies",
      level: "Easy Peasy",
      ingredients: ["butter", "caster sugar", "plain flour", "cinnamon", "chocolate chips"],
      cuisine: "Baked goods",
      dishType: "snack",
      duration: 32,
      creator: "Sophie",
    })

    const recipes = await Recipe.insertMany(data)

    const updateRigatoni = await Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})

    const deleteCarrotCake = await Recipe.deleteOne({title: "Carrot Cake" })

    const disconnect = await mongoose.connection.close()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });