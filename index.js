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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    updateRecipe();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


async function updateRecipe() {
  try {
    const recibe = await Recipe.create({
      title: " 1000 Recipes",
      level: "Easy Peasy",
      ingredients: ["Bread", "Eggs", "milk"],
      cuisine: "the best one",
      dishType: "main_course",
      image: "something",
      duration: 30,
      creator: "margarida",
    })

    console.log(`title: ${recibe.title}`);

    const arr = await Recipe.insertMany(data);

    arr.forEach(element => {
      console.log("title: ", element.title);
    });

    const update = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );

    console.log("update sucessful");


    const remove = await Recipe.deleteOne(
      { title: "Carrot Cake" },
    );

    console.log("remove successful");


  } catch (e) {
    console.log("Error occurred", e);

  } finally {
    mongoose.connection.close();
  }

}
