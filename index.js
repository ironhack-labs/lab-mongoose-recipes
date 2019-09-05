const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

const newRecipe = {
  title: 'Ham and Eggs',
  level: 'Amateur Chef',
  ingredients: ['2 egss', '1 jam slice', '1 soy oil spoon', 'Salt (whatever you like)'],
  cuisine: 'Mexican',
  dishType: 'Dish',
  image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  duration: 10,
  creator: 'Chef Káiser'
}

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', {
    useNewUrlParser: true
  })
  .then(async () => {
    console.log('Connected to Mongo!');
    // Iteración 2
    const recipe = await Recipe.create(newRecipe)
    console.log(`${recipe.title} new recipe CREATED!`)

    // Iteración 3
    const recipesArray = await Recipe.create(data)
    recipesArray.forEach(e => {
      console.log(`${e.title} recipe CREATED!`)
    })

    // Iteración 4
    await Recipe.findOneAndUpdate({
      title: 'Rigatoni alla Genovese'
    }, {
      duration: 100
    })
    console.log(`Recipe Updated!`)

    // Iteración 5
    await Recipe.findOneAndDelete({
      title: 'Carrot Cake'
    })
    console.log(`Carrot Cake Deleted`)

    // Iteración 6
    mongoose.connection.close()
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });