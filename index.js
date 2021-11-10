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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => Recipe.syncIndexes())
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe
      .create([
        {
          title: 'Fried eggs',
          level: 'Amateur Chef',
          ingredients: [
            '2 Egg',
            'olive oil',
            '1 garlic clove'
          ],
          cuisine: 'Spanish',
          disthType: 'other',
          image: 'https://cocina-casera.com/wp-content/uploads/2011/10/como-hacer-huevo-frito.jpg',
          duration: 5,
          creater: 'Carlos P',
          created: '10/11/2021'
        }
      ])
  })

  .then(theNewRecipe => console.log('Se ha creado esta receta:', theNewRecipe))

  .then(() => Recipe.create(data))
  .then(theNewRecipes => console.log('Se han creado estas recetas:', theNewRecipes))

  .then(() => Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true }))
  .then(theUpdateRecipe => console.log("The update recipe it is:", theUpdateRecipe))

  .then(() => Recipe.findOneAndDelete({ title: 'Carrot Cake' }))
  .then(theDeleteRecipe => console.log("The delete recipe it is:", theDeleteRecipe))
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

mongoose.connection.close()