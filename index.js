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
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

function createRecipe(infos) {
  return Recipe.create({
    title: infos.title,
    level: infos.level,
    ingredients: infos.ingredients,
    cuisine: infos.cuisine,
    dishType: infos.dishType,
    image: infos.image,
    duration: infos.duration,
    creator: infos.creator,
    created: infos.created,
  })
}

createRecipe({
  title: 'test',
  // level: 'Amateur Chef',
  // ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
  // cuisine: 'Asian',
  // dishType: 'Dish',
  // image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  // duration: 40,
  // creator: 'Chef LePapu'
})

function insertManyRecipe(arr) {
  Recipe.insertMany(arr)
    .then(res => {
      for (i = 0; i < arr.length; i++) {
        console.log(arr[i].title);
      }
      updateRigatoni()
      deleteCarrotCake()
    })
    .catch(err => {
      console.error(err)
    })
    .finally
}

insertManyRecipe(data);

function updateRigatoni() {
  Recipe.update({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
    .then(res => console.log("success"))
    .catch(err => console.log("failure"));
}
function deleteCarrotCake() {
  Recipe.deleteOne({ title: 'Carrot Cake' })
    .then(res => {
      console.log("success")
      mongoose.connection.close()
    })
    .catch(err => console.log("failure"));
}
