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
   const myRecipe = {
    title: "Knackillette",
    level: 'Amateur Chef',
    ingredients: ["Saucisse", "Coquillette"],
    cuisine: "Child",
    dishType: "main_course",
    duration: 60,
    creator: "Max",
   }
   Recipe.create(myRecipe) //Model.create(myRecipe)
    .then(dbSuccess => {console.log(myRecipe.title)})
    .catch(dbErr => {console.log(dbErr)})
    // Run your code here, after you have insured that the connection was made
  })
  Recipe.insertMany(data)
    .then(dbSuccess => {
      data.forEach((element) => {
        console.log(element.title)})

        Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'},{ duration: "100"}, {new:true})
        .then(dbSuccess => {console.log(dbSuccess)})

          Recipe.deleteOne({title: 'Carrot Cake'})
          .then(dbSuccess => {console.log(dbSuccess)})

            mongoose.Connection.close()
              .then(dbSuccess => {console.log("It's closed!")})
              .catch(dbErr => {console.log(dbErr)})

          .catch((dbErr) => {console.log(dbErr)})

        .catch(dbErr => {console.log(dbErr)})
      })
  .catch(error => {
    console.error('Error connecting to the database', error);
})

mongoose.connection.close()