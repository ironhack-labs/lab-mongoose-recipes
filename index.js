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
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(async () => {
    // Run your code here, after you have insured that the connection was made
    const grilledCheeseSandwish = {
      title: "Grilled Cheese Sandwish",
      level: "Easy Peasy",
      ingredients: ["Sliced Bread", "Cheese"],
      cuisine: "Home",
      dishType: "snack",
      duration: 5,
      creator: "Mom"
    }

    try {
      // it: 2
      const newOne = await Recipe.create(grilledCheeseSandwish);
      // it: 3
      const newMany = await Recipe.insertMany(data);
      // it: 4
      await Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { $set: { duration: 100 } });
      // it: 5
      await Recipe.deleteOne({ title: "Carrot Cake" })


      console.log("New 1:", newOne.title);
      newMany.forEach(recipe => console.log("title:", recipe.title));
      console.log("Rigatoni alla Genovese updated");
      console.log("Carrot Cake deleted");

    } catch (err) {
      console.log("Error:", err);
    }

    mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
