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
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

//   // ITERATION 2: Create recipe
//   const quesadilla = {
//     title: "Quesadilla",
//     level: "Easy Peasy",
//     ingredients: ["Tortilla", "Queso oaxaca" ],
//     cuisine: "Mexican",
//     dishType: "Breakfast", 
//     image: "default",
//     duration: 5,
//     creator: "Receta Popular",
//   };
//   Recipe.create(quesadilla)
//     .then((recipe) => {
//       console.log(`your recipe ${recipe} has been added`);
//     })
//     .catch((err) => console.log(err)); 

// // ITERATION 3: Insert Multiple recipes
//   Recipe.create(data)
//   .then((results) => { 
//   for (let result of results){
//   console.log(result.title);
//   }})
//   .catch((err) => console.log(err));

//  // ITERATION 4: Update recipe
//   const filter = {title: "Rigatoni alla Genovese"};
//   const update = {duration: 100};

//   Recipe.findOneAndUpdate(filter, update, { new: true })
//     .then(()=>console.log(`recipe Rigatoni updated`))
//     .catch((err) => console.log(err))

// // ITERATION 5: Remove a recipe
// Recipe.deleteOne({title: "Carrot Cake"})
//   .then(()=>console.log(`Carrot Cake has been deleted`))
//   .catch((err) => console.log(err))

  //ITERATION 6: Close the database
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected');
  });
});
