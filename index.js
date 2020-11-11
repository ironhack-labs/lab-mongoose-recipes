const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const newRecipe = {
  title: "Spanish Omelet",
  level: "Amateur Chef",
  cuisine: "Spanish",
  dishType: "main_course",
  image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
  duration: 30,
}


// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  
  .then(() => {
    Recipe
      .create(newRecipe)
      .then(newRecipe => {
        console.log(`The new recipe is: ${newRecipe.title}`)
        return Recipe.insertMany(data)
      })
    
      .then(newRecipes => {
        newRecipes.forEach(
          recipe => console.log(recipe.title)
        )
        return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, {new:true})
      })
        
      .then(updatedRecipe => {
        console.log(`Success! ${updatedRecipe.title} was updated, it's duration is now ${updatedRecipe.duration}`)
        return Recipe.deleteOne({ title: "Carrot Cake" })
      })
        
      .then(deletedRecipe => {
        console.log(`Success! ${deletedRecipe} was deleted.`)
      })

      .then(() => {
      mongoose.connection.close()
      })

      .catch(err => console.log('Hubo un error', err))
  })

  

  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  
  
  

  
