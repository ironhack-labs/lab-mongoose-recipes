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
    // const newRep = {
    //   "title": "Pablito al horno",
    //   "level": "Amateur Chef",
    //   "ingredients": [
    //     "1/2 cup rice vinegar",
    //     "5 tablespoons honey"
    //   ],
    //   "cuisine": "Spanish",
    //   "dishType": "main_course",
    //   "duration": 20,
    //   "creator": "Chef Batman"
    // }
    // return Recipe.create(newRep);

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

mongoose.connection.on("connected", () =>
  console.log("Mongoose default connection open")
);
mongoose.connection.on("error", (err) =>
  console.log(`Mongoose default connection error: ${err}`)
);
mongoose.connection.on("disconnected", () =>
  console.log("Mongoose default connection disconnected")
);

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});