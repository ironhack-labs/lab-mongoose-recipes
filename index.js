const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const eggRecipe = {
  title: "Fried egg",
  level: "Easy Peasy",
  ingredients: ["2 eggs", "tbsp olive oil"],
  cuisine: "Global",
  dishType: "breakfast",
  duration: 5,
  creator: "Chef Rowan"
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
    
    
    Recipe.create(eggRecipe).then((recipe) => console.log(recipe.title))
  
      .then(() => {
        Recipe.insertMany(data).then((recipes) => recipes.forEach((recipe) => console.log(recipe.title)))
      
          .then(()=> {
            Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}).then(() => console.log("successfully changed the durations"))
          
              .then(()=> {
                Recipe.deleteOne({title: "Carrot Cake"}).then(console.log("successfully deleted Carrot Cake"))
                 
                  .then(() => {
                    mongoose.connection.close()
                    
                  })
              })
          })
      })     
  })
  

  .catch(error => {
    console.error('Error connecting to the database', error);
  })

  


