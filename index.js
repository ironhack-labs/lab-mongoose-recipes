const mongoose = require('mongoose');              

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
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
    // console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    console.log("Connection succesfful!");
    updateDatabase();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
   

//Adding a new dish to our DB
  async function updateDatabase() {
    try {
    const newDish = await Recipe.create({          
      title: "Arrabiata",                                    
      level: "Easy Peasy",
      ingredients: ["tomatoes", "tomato paste", "garlic", "onions", "pasta", "olive oil", "bacon"],
      cuisine: "Italian",
      dishType: "main_course",
      image: "N/A",
      duration: 30,
      creator: "unknown",
      created: "",
  });
      console.log("new dish created", newDish.title);

    const moreNewDishes = await Recipe.insertMany(data);

    moreNewDishes.forEach(function (recipe) {  
      console.log(recipe.title);
    })

await Recipe.findOneAndUpdate(
    {title: "Rigatoni alla Genovese"}, {duration: 100}
  )

await Recipe.findOneAndDelete(
  {title: "Carrot Cake"},
  console.log("carrot cake is deleted from the DB"))

}   catch (e) {
    console.log('error', e);
  } finally {
    mongoose.connection.close();                   // finally command is good practice to close the conneciton to the DB
  }                                                  //it minimizes data usage of the DB. So the DB closes when not used. 
}
