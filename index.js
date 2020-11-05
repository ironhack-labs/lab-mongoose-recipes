const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    return self.connection.dropDatabase();
  })
  .then(() => {
    Recipe.create(recipeObj)
      .then((results) => console.log(`Saved new recipe: ${results.title}`))
      .catch((saveErr) => console.error(`Save failed: ${saveErr}`)),

      Recipe.insertMany(data)
      .then((results) => console.log(`Succesfully added ${results.values.title}`))
      .catch((saveErr) => console.error(`Save failed: ${saveErr}`)),

      setTimeout(function () {
        Recipe.findOneAndUpdate({
            title: "Rigatoni alla Genovese"
          }, {
            duration: 100
          })
          .then((results) => console.log(`Succesfully updated!`))
          .catch((saveErr) => console.error(`Save failed: ${saveErr}`)),

          Recipe.deleteOne({
            title: 'Carrot Cake'
          })
          .then((results) => console.log(`Succesfully deleted`))
          .catch((saveErr) => console.error(`Save failed: ${saveErr}`))
      }, 1000)

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(`Mongo connection disconnected`);
    process.exit(0);
  });
})

const recipeObj = {
  title: 'Pizza funghi',
  level: 'Easy Peasy',
  ingredients: ['flour', 'water', 'tomato sauce', 'salt', 'pepper', 'oregano', 'cheese', 'basilicum', 'mushrooms'],
  cuisine: 'Italian',
  dishType: "main_course",
  image: 'https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_1140/https://foodfromclaudnine.nl/wp-content/uploads/2019/09/LRM_EXPORT_588516826938097_20190906_200813581-1140x1425.jpeg',
  duration: 40,
  creator: 'Antonio the Italian',
  created: new Date()
}