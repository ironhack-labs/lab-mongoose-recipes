const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
// console.log(data)
//console.log(data[4])

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
    //IT 2
    Recipe
      .create({
        title: 'Classic Cheesecake',
        level: 'Easy Peasy',
        ingredients: ['Block cream cheese', 'Sugar', 'Sour cream', 'A little flavor', 'Eggs'],
        cuisine: 'American',
        dishType: 'dessert',
        image: 'https://cdn.sallysbakingaddiction.com/wp-content/uploads/2018/05/perfect-cheesecake-recipe.jpg',
        duration: 30,
        creator: 'Chef Ángela',
        created: new Date(2021, 1, 27),
      })
      .then((recipe) => {
        console.log(recipe.title)
      })
      .then(() => {
        //IT 3
        Recipe
          .insertMany(data)
          .then((recipes) => {
            recipes.forEach(recipe => console.log(recipe.title))
          })
          .catch((e) => console.log("Error, no recipe update", e))
      
      .then(() => {
        //IT 4
        Recipe
          .updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
          .then((recipe) => {
            console.log('RECIPE', recipe)
            console.log(`Changes in Rigatoni alla Genovese's recipe have been saved`)
          })
          .catch((e)=> console.log("Error changes in Rigatoni alla Genovese's recipe", e))
      })
      .then(() => {
        //IT 5
        Recipe
          .deleteOne({ title: 'Carrot Cake' })
          .then((recipe) => {
            console.log('RECIPE', recipe)
            console.log(`The Carrot Cake's recipe has been deleted from the DB`)
          })
          .catch((e)=> console.log("Error Carrot Cake no deleted", e))
        })
      })
      .catch((e) => console.log("Error creating recipe", e))

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

process.on("SIGINT", () => {
  mongoose.connection
    .close()
    .then(() => console.log("Successfully disconnected from the DB"))
    .catch((e)=> console.log("Error disconnecting from the DB", e))
    .finally(()=> process.exit())
})
  

