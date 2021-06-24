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
    useUnifiedTopology: true,
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    console.log("Connection");
    updateDatabase();
    // Run your code here, after you have insured that the connection was made
  })



  .catch(error => {
    console.error('Error connecting to the database', error);
  });


async function updateDatabase() {

  try {
  //create
 
  const RecipeCreated = await Recipe.create({
    title:"Panquecas",
    level: "Amateur Chef",
    ingredients: ["egg", "flour", "milk", "sugar"],
    cuisine: "portuguesa",
    dishType:"breakfast",
    image: "https://images.media-allrecipes.com/images/75131.jpg",
    duration: 5,
    creator: "joao"
   });

    console.log("Model created", RecipeCreated);

    await Recipe.insertMany(data);

    data.forEach(element => {
      console.log(element.title);
    });
    
    await Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 });
    await Recipe.deleteOne({title: "Carrot Cake"});

    console.log("success", Recipe.deleteOne);
  } 
  catch (e) {
    console.log("error occurred", e);
  }
  finally {
    mongoose.connection.close();
  }
}

