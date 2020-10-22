const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';



// const nuevaRecipe = mongoose.model("Recipe", data)

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

    return Recipe.create({
      title: 'Tortilla de jamon dulce y queso',
      level: 'Easy Peasy',
      ingredients: ['huevos', 'jamon dulce', 'queso'],
      cuisine: 'española',
      dishType: 'soup',
      image:
        'https://i.imgur.com/pja868i.jpg',
      duration: 12,
      creator: 'Andreu'
    })

  }).then(() => {
    return Recipe.insertMany(data)

  })
  .then((result) => {
    result.forEach((ele) => {
      console.log(ele.title)
    })
    return Recipe.findOneAndUpdate(
      { title: "Carrot Cake" },
      { duration: 100 },
      { new: true },
      (e) => { console.log(e) })

  })
  .then((result2) => {
    console.log(result2)
  })
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    mongoose.connection.close(() => {
      console.log("Mongoose default connection disconnected through app termination");
      process.exit(0);
    });
  })
  .catch((e) => { console.log(e) })

