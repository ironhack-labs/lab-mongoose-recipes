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
  
    Recipe.create({
    title: "Omelette",
    level: "Easy Peasy",
    ingredients: ["eggs", "butter", "salt", "pepper", "cooking oil"],
    cuisine: "International",
    dishType: "breakfast",
  })
  .then((dbResponse) => {
    console.log(dbResponse);

    Recipe.insertMany(data)
    .then((dbResponse) => {
      data.forEach((element) => {
        console.log(element.title + " has been added to the database");
      });
  
      Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese'}, {duration: 100}, {new: true})
      .then((dbResponse) => {
        console.log("Duration has been successfully updated in the database for " + dbResponse.title);

        Recipe.deleteOne({title: 'Carrot Cake'})
        .then((dbResponse) => {
          console.log("Carrot Cake has been removed from the database");
        })

        .catch((dbErr) => {
          console.log(dbErr);
        });
      
      })
      .catch((dbErr) => {
        console.log(dbErr);
      });
  
    })
    .catch((dbErr) => {
      console.log(dbErr);
    });

  })
  .catch((dbErr) => {
    console.log(dbErr);
  });
  
})
// .catch((dbErr) => {
//   console.log(dbErr);
// });

.catch(error => {
  console.error('Error connecting to the database', error);
});
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});