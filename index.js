const mongoose = require('mongoose');

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
    return Recipe.create(
      {title: "Mac&Cheese", level: "Easy Peasy", ingredients: ["macaroni", "cheese"], cuisine: "USA", dishType: "main_course", duration: 60, creator: "Johnny Macaroni"}
    )
  })
  .then(newRecipe => console.log(`The new recipe is called: ${newRecipe.title}`))

  .then(() => {
    return Recipe.insertMany(data)
  })
  .then(data => data.forEach(elm => console.log(`The new recipe is called: ${elm.title}`)))

  .then(() => {
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100}, { new: true })
  })
  .then(updatedRecipe => console.log(`The updated recipe duration is: ${updatedRecipe.duration}`))

  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" })
  })
  .then(updatedRecipe => console.log(`The selected recipe is no longer available`))

  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    })
  })
