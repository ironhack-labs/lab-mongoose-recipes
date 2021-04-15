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
    // Recipe.create(data[0])
    //   .then(createdRecipe => {
    //     console.log(`Recipe created: ${createdRecipe.title}`)
    //   })
    //   .catch(error => console.error(error));

    Recipe.insertMany(data)
      .then(data => {
        console.log(`Recipes created: ${data.length}`)

        Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" },
          { $set: { duration: 100 } }, { new: true })
          .then(data => {
            console.log("Change done successfully", data)
          })
          .catch(error => console.error(error));

        Recipe.deleteOne({ title: "Carrot Cake" })
          .then(recipe => {
            console.log(`A recipe has been deleted`, recipe)
          })
          .catch(error => console.error(error));
      })
      .catch(error => console.error(error));
  })

  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });