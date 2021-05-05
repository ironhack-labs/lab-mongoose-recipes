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
  .then(async () => {
    const food = await Recipe.create(
      {
        title: "salmorejo",
        level: "Easy Peasy",
        ingredients: ["tomatoes", "olive oil", "garlic", "salt", "ham", "egg"],
        cuisine: "Spanish",
        dishType: "main_course",
        image: "https://images.media-allrecipes.com/images/75131.jpg",
        duration: 30,
        creator: "Unknown",
        created: Date(),
      })
    //INSERT MANY
    const addRecipes = await Recipe.insertMany(data);

    //UPDATE
    const updatePasta = await Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { useFindAndModify: false });
    //DELETE
    const deleteCake = await Recipe.deleteOne({ title: "Carrot Cake" }, { useFindAndModify: false });
  })
  // Run your code here, after you have insured that the connection was made

  .then(mongoose.connection.close())
    .catch(error => {
      console.error('Error connecting to the database', error);
    });
