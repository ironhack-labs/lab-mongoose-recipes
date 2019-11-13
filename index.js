const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'



// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', {
    useNewUrlParser: true
  })

  .then(() => {
    console.log('Connected to Mongo!');
   return Recipe.collection.drop(); // to drop
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  })

  .then(() => {

    return Recipe.create({
        title: ' Glazed  Thighs',
        level: 'Amateur Chef',
        ingredients: ['1/2 cup water', '5 tablespoons of sugar', '1/3 cup soy sauce', '1/4 cup olive oil', '3 tablespoons of love', '3 tablespoons minced gummy bear', 'salt to taste', '8 skinless, boneless marshmallows'],
        cuisine: 'Asian',
        dishType: 'Dish',
        image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
        duration: 40,
        creator: 'Chef LePapu'
      })
      .then((recipe) => console.log("recipe created"))
      .catch(error => console.log("2nd process" ,error))

  })

  .then(() => {

    return Recipe.insertMany(data)
    .then (newRecipe => {
     newRecipe.forEach(recipe => {
       console.log(recipe.title);
     }
    )
    // .catch(error => console.log("3rd process" ,error))
    })

  })

 .then(() => {

  return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
  .then((recipeUpdated) => console.log("success"))
// .catch(error => console.log("final process" ,error))
 })

.then(() => {
  return Recipe.deleteOne({title: "Carrot Cake"})
  .then(() => console.log("success"))
})

.then(() => {
  mongoose.connection.close()
})



