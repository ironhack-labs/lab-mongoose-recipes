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
    //return self.connection.dropDatabase();
  })
  
  .then(() => {
    const receta = Recipe.create({
      title : " la cosa nostra ",
      level : "Easy Peasy",
      ingredients : [" 1/2 taza" , "medio kilo de fideos" , "agua"],
      cuisine : " Italian ",
      dishType : "breakfast",
      image : "https://i.ytimg.com/vi/wjxwpKXcONQ/maxresdefault.jpg",
      duration: "10 min",
      creator : "da vinci", 
      date: "25/5/1892"
    })
  })
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


  (async () => {
    try {
      const recipe = await Recipe.insertMany(data);
      console.log(`This user was saved ${recipe.title}`);
    } catch (error) {
      console.log(error.message);
    }
  })();


  (async () => {
    try {
      const update = await Recipe.findOneAndUpdate(
        { name: "Rigatoni alla Genovese" },
        { duration: 100 },
        
      );
      console.log(update);
    } catch (error) {
      console.log(error.message);
    }
  })();
  