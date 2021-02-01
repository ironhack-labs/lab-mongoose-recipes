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
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // Recipe.create({
    //   "title": "Spanish Flan",
    //   "level": "Amateur Chef",
    //   "ingredients": [
    //     "1 cup white sugar",
    //     "3 eggs",
    //     "1 (14 ounce) can sweetened condensed milk",
    //     "1 (12 fluid ounce) can evaporated milk",
    //     "1 tablespoon vanilla extract"
    //   ],
    //   "cuisine": "Spanish",
    //   "dishType": 'dessert',
    //   "image": "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F2586978.jpg&w=596&h=596&c=sc&poi=face&q=85",
    //   "duration": 120,
    //   "creator": "Chef John"
    // })
    //   .then(recipe => console.log(recipe))
    //   .catch(error => {
    //     console.log('Error: ' + error);
    //   })
    // Recipe.insertMany(data)
    //   .then(recipes => {
    //     // console.log(recipes)
    //     recipes.forEach((recipe) => {
    //       console.log(`Recipe: ${recipe.title}`)
    //     })
    //   })
    //   .catch(error => {
    //     console.log('Error: ' + error);
    //   })

    // Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { $set: { duration: 100 } }, { new: true })
    //   .then(recipe => { console.log('Updated:' + recipe) })
    //   .catch(error => {
    //     console.log('Error: ' + error);
    //   })

  })
  .then(() => {
    Recipe
      .updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
      .then(console.log(`The recipe has been updated `))
      .catch(error => console.log('An error happened while updating :', error));
  })
  .then(() => {
    // Recipe.deleteOne({ title: "Carrot cake" })
    //   .then(recipe => console.log('Deleted: ' + recipe))
    //   .catch(error => {
    //     console.log('Error: ' + error);
    //   })
  })


  .catch(error => {
    console.error('Error connecting to the database', error);
  })

process.on("SIGINT", () => {
  mongoose.connection
    .close()
    .then(() => console.log("Disconnected"))
    .finally(() => process.exit())
}) 
