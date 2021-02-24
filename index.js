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
  .then(() => {
    // Run your code here, after you have insured that the connection was made

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

// 2 create a recipe

  function createRecipe(infos){
    const {title, level, ingredients, cuisine, dishType, image, duration, creator, created } = infos; 
    Recipe.create({ 
      title, level, ingredients, cuisine, dishType, image, duration, creator, created
    })
    .then((dbSuccess) => {
      console.log(dbSuccess);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  createRecipe({

    title: "pizza",
    level: "Amateur Chef",
    ingredients: ["farine", "eau", "tomate", "champignon", "basilic"],
    cuisine: "Italian",
    dishType: "main_course",
    image: "https://www.papa-cool.fr/wp-content/uploads/2020/09/comment-faire-une-pizza-napolitaine-1024x684.jpg",
    duration: 20,
    creator: "Luigi",
    created: "2020-06-15"

  })

//3 insert the recipes

const recipesList = require('./data.json');
console.log(recipesList);

function insertRecipes(arr){
  Recipe.insertMany(arr)
  .then((dbSuccess) => {
    console.log(dbSuccess);
  })
  .catch((err) => {
    console.log(err);
  });
}

insertRecipes(recipesList);
 
//4 findOneAndUpdate

function findOneUpdate(condition, update){
  Recipe.findOneAndUpdate(condition, update)
  .then((dbSuccess) => {
    console.log(dbSuccess);
  })
  .catch((err) => {
    console.log(err);
  });
}

findOneUpdate({title : "Rigatoni alla Genovese"}, {$set: {duration: 100 }})

//5 remove a recipe

function deleteOneItem(itemToDelete){
  Recipe.deleteOne(itemToDelete)
  .then((dbSuccess) => {
    console.log(dbSuccess);
  })
  .catch((err) => {
    console.log(err);
  });
}

deleteOneItem({title : 'Carrot Cake'});
  

//6 Close the database

