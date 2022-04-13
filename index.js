const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'

const Recipe = require('./models/Recipe.model');

// Import of the data from './data.json'

const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"

mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => Recipe.syncIndexes())
  .then(() => {

    Recipe
      .create({
        title: "Carrot Cake",
        level: "Amateur Chef",
        ingredients: [
          "6 cups grated carrots",
          "1 cup brown sugar",
          "1 cup raisins",
          "4 eggs",
          "1 1/2 cups white sugar",
          "1 cup vegetable oil",
          "2 teaspoons vanilla extract",
          "1 cup crushed pineapple, drained",
          "3 cups all-purpose flour",
          "1 1/2 teaspoons baking soda",
          "1 teaspoon salt",
          "4 teaspoons ground cinnamon"
        ],
        cuisine: "International",
        dishType: "dessert",
        image: "https://images.media-allrecipes.com/userphotos/720x405/3605684.jpg",
        duration: 130,
        creator: "Chef Nadia"
      })
  })
  .then(newRecipe => console.log('nueva receta', newRecipe))
  .catch(error => {
    console.error('Error connecting to the database', error);
  })

  //iteración 3

  .then(() => {
    return Recipe.insterMany(data)
  })

  //iteración 4

  .then(() => {
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  })

  //iteración 5

  .then(() => {
    return Recipe.deleteOne({ title: { $eq: "Carrot Cake" } }) // 
      //En los apuntes Germán dice que recibe como argumento una query que afecta al primer match, pero no sé si es así. 
      .catch(err => console.log('¡Prontito tendremos más CK!', err))
  })

//iteración 6 

mongoose.connection.close()