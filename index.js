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

  .then(async(recipeSuccess) => {
    try {
    // Run your code here, after you have insured that the connection was made
    //console.log(title)
      //iteration 2
    const responsefromdb = await Recipe.create(myRecipe);
    console.log("Creation succeded: ", responsefromdb)
  //iteration 3
    const resipe3 = await Recipe.insertMany(data);
    resipe3.forEach((recipe) => console.log(recipe.title))
  //iteration 4
    const resdbite4 = await Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true});
    console.log("ite3", resdbite4)  
  //iteration 5
    const resdbite5 = await Recipe.findOneAndDelete({title: "Carrot Cake"});
    console.log("ite4", resdbite5)
  "Carrot Cake"
  //iteration 6
    await mongoose.connection.close();
    console.log("Db disconnected")
    } catch(err){
      console.log("error")
    }
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
  

  const myRecipe = {
    "title": "myRecipe",
    "level": "Amateur Chef",
    "ingredients": [
      "1 large egg" 
    ], 
    "cuisine": "French",
    "dishType": "dessert",
    "image": "https://images.media-allrecipes.com/images/75131.jpg",
    "duration": 30,
    "creator": "Fatou"
  }