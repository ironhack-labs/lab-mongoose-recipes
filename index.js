const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
 const promise1 = Recipe.insertMany(data);

Promise.all([promise1])
  .then(values => {
    console.log('New recipes have been inserted');
    console.log(values);
    mongoose.connection.close();
  })
  .catch(err => console.error(err));

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
  //  return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


  /* (async () => {
    try {
      const recipe = await Recipe.create({
        title: 'Tzatziki',
        level: 'Easy Peasy',
        ingredients: 'Yogurt, cucumber, Olive oil, garlic, salt',
        cuisine: 'Greek',
        dishType: 'other',
        duration: 15,
        creator: 'Eri',

      });
      console.log(`The recipe is ${recipe.title}`);
    } catch (error) {
      console.log(error.message);
    }
  })(); */


  (async () => {
  try {
    const update = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
    console.log(update);
  } catch (error) {
    console.log(error.message);
  }
})(); 
  

(async () => {
  try {
    const deleted = await Recipe.deleteOne({ title: "Carrot Cake" });
    console.log(deleted);
  } catch (error) {
    console.log(error.message);
  }
})(); 

mongoose.connection.close(() => {
  console.log('Mongoose default connection disconnected through app termination');
});