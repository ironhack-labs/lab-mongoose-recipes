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
    // return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

 (async() =>{
   const totalRecipes = Recipe.insertMany(data);
 })();

(async() => {
  try{
    const food = await Recipe.create({
      title: 'Tortilla de patatas',
      level: 'Easy Peasy',
      ingredients: 'Potatoes, Eggs, Onions, Olive Oil, Salt',
      cuisine: 'Spanish',
      dishType: 'main_course',
      duration: 15,
      creator: 'Eric',
      })
      console.log(food)
  } catch (error){
    console.log(error)
  }
})();


(async () => {
  try {
    const update = await Recipe.findOneAndUpdate(
      {title: 'Rigatoni alla Genovese'},
      {duration: 100},
      {new: true}
    );
    console.log(update);
  } catch (error) {
    console.log(error.message);
  }
})();

(async () => {
  try {
    const remove = await Recipe.deleteOne(
      {title: 'Carrot Cake'},
      {new: true}
    );
    console.log(remove);
  } catch (error) {
    console.log(error.message);
  }
})();

mongoose.connection.close(() => {
  console.log('Mongoose default connection disconnected through app termination');
})  