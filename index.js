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

    Recipe
      .create({
        title: "Fried eggs", 
        level: "Easy Peasy", 
        ingredients: ["Eggs", "Olive oil", "Salt"],
        cuisine: "International", 
        dishType: "main_course", 
        image: "https://images.media-allrecipes.com/images/75131.jpg", 
        duration: 5, 
        creator: "Chef Sara", 
        reated: "default" 
      })
      .then((newRecipe => console.log('Data created:', newRecipe.title)))
      .catch((error=> console.log('Error, data not created:', error)))
      

    Recipe
      .insertMany(data)
      .then((allRecipes => {
        allRecipes.forEach(allRecipes => console.log('All data created:', allRecipes.title))
      }))
      .catch((error=> console.log('Error, all data not created:', error)))


    Recipe
      .findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, { new: true })
      .then((changed => console.log('Data updated:', changed.duration)))
      .catch((error => console.log('Error, data not updated:', error)))

    Recipe
      .deleteOne({title: "Carrot Cake"})
      .then((deletedRecipe => console.log('Data deleted', deletedRecipe.title)))
      .catch((error => console.log('Error, data not deleted:', error)))       
})
.catch(error => 
  console.error('Error connecting to the database:', error)
)

// mongoose.connection.close();
