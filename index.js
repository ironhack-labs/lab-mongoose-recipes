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

const myRecipe = {
  title: "Best Chocolate Cake",
  level: "Easy Peasy",
  ingredients: ["flour", "eggs", "chocolate", "sugar"],
  cuisine: "Global",
  dishType: "dessert",
  image: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/vimdb/202685_0-803-5447-5447.jpg",
  duration: 20
}

  const myRecipeCreated = await Recipe.create(myRecipe);
  console.log(myRecipeCreated.title);

  const insertedRecipeArr = await Recipe.insertMany(data);
  insertedRecipeArr.forEach((recipe) => console.log(recipe.title))

  await Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"},
  {duration: 100}
  );

  console.log("Recipe has been updated!");

  await Recipe.deleteOne({title: "Carrot Cake"});
  console.log("Recipe has been deleted!");

  await mongoose.connection.close();
    console.log('connection closed!');
}
