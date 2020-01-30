const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async x => {

    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)

    const recipe = {
      title: 'Enchiladas',
      level: 'Amateur Chef',
      ingredients: ['chicken', 'tortillas', 'tomatoes', 'onion', 'garlic', 'cheese', 'cream'],
      cuisine: 'Mexican',
      dishType: 'Dish',
      duration: 45,
      creator: 'Mom'
    }

    const firstRecipe = await Recipe.create(recipe)
    console.log(firstRecipe.title)

    const many = await Recipe.create(data)
    many.forEach(element => console.log(element.title))

    const updateRecipe = await Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true})
    console.log(updateRecipe, '⬆️ ...RECIPE UPDATED...')

    const deleteRecipe = await Recipe.deleteOne({title: "Carrot Cake"})
    console.log(deleteRecipe, '⛔️ ...RECIPE DELETED...')

    mongoose.connection.close()

  })
  .catch(err => console.error('Error connecting to mongo', err));
