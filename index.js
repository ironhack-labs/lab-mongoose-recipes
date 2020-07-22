const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe');
// Import of the data from './data.json'
const data = require('./data.json');

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
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

const newRecipe = {
  title: 'Tallarines Carbonara',
  level: 'Easy Peasy',
  ingredients: ["salt", "4 eggs",
    "tallarines", "black pepper"
  ],
  cuisine: 'Italian',
  dishType: "main_course",
  image: "/models/images/carbonara.jpg",
  duration: 25,
  creator: "Chef Mario"
};

Recipe.create(newRecipe)
  .then(recipe => console.log('The recipe is saved and its value is: ', recipe))
  .catch(error =>
    console.log('An error happened while saving a new recipe:', error)
  );

data.insertMany([])
.then(function () {
  console.log("Data inserted") // Success 
}).catch(function (error) {
  console.log(error) // Failure 
});

Recipe.updateOne({
    title: "Rigatoni alla Genovese"
  }, {
    duration: 100
  })
  .then((recipe) => console.log(recipe))
  .catch((err) => console.log(err));

Recipe.deleteOne({
    title: "Carrot Cake"
  })
  .then((recipe) => console.log(recipe))
  .catch((err) => console.log(err));

/*(async () => {
  const db = await mongoose.connect('mongodb://localhost:27017/recipe-app', {
    useMongoClient: true
  })

  //do stuff

  db.disconnect()
})
process.on("SIGINT", () => {
      mongoose.connection.close(() => {
        console.log(
          "Mongoose default connection disconnected through app termination "
        );
        process.exit(0);
      });