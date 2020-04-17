const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const myRecipe = {
  title: "Benjo's Italian recipe",
  level: "UltraPro Chef",
  ingredients: ["1 mozzarella", "2 spoonfuls of olive oil", "basil"],
  cuisine: "Italian",
  dishType: "starter",
  duration: 5,
  creator: "Eataliana",
}

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
    Recipe.create(myRecipe)
    .then((dbRes) => {
      console.log(dbRes)
    }).catch((dbErr) => {
      console.log(dbErr)
    })
   
    Recipe.insertMany(data)
    .then((dbRes) => {
      console.log(dbRes);
      Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100},
      {new: true})
      .then((dbRes) => {
        console.log(dbRes)
        Recipe.deleteOne({title: "Carrot Cake"})
        .then((dbRes) => {
          console.log(dbRes)
          mongoose.connection.close()
          .then((dbRes) => {
            console.log("Database closed!")
          })
          .catch((dbErr) => {
            console.log(dbErr)
          })
        }).catch((dbErr) => {
          console.log(dbErr)
        })
      }).catch((dbErr) => {
       console.log(dbErr)
       })
      }).catch((dbErr) => {
        console.log(dbErr)
      })
    })
    .catch((dbErr) => {
      console.log(dbErr)
    })
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
