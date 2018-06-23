const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp') //===> is the database we are connecting
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

//CREATE A NEW MONGO SCHEMA WITH MONGOOSE
const recipeSchema = new Schema({
  title : {type: String, required: true, unique:true},
  level : {type: String, enum: ['Easy Peasy','Amateur Chef','UltraPro Chef']},
  ingredients : {type: Array},
  cousine : {type: String, required: true},
  dishType : {type: String, enum: ['Breakfast','Dish','Snack','Drink','Dessert','Other']},
  image : {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration : {type: Number, min: 0},
  creator : {type: String},
  created : {type: Date, default: Date.now},

});

//CREATE A NEW MONGOOSE MODEL USING THE SCHEMA CREATED BEFORE
let Recipe = mongoose.model('Recipe', recipeSchema);

//CREATE A NEW DOCUMENT USING DE MODEL AND SCHEMA BEFORE.
Recipe.create({
  title: 'Arroz con Frijoles', 
  level: 'Easy Peasy', 
  ingredients: ['Arroz','Frijoles','Agua','Sal','Aceite','Laurel'], 
  cousine: 'Cuban',
  dishType: 'Dish',
  image:'http://estag.fimagenes.com/img/3/2/3/g/Z/23gZ_900.jpg',
  duration: 30,
  creator: 'Some cuban!'
}).then((recipe) => {console.log('The recipe is saved and its title is: ', recipe.title)})
.catch((err) => {console.log('An error happened:', err)});

Recipe.insertMany(data)
  .then((recipes) => {
    recipes.forEach(recipes => {
      console.log('The recipe is saved and its title is: ', recipes.title);
    });
  })
  .catch((err) => {
    console.log('An error happened: ',err);
  });
  
function modifiedRecipe() {
  Recipe.updateOne({title: 'Rigatoni alla Genovese'},{duration: 100})
    .then((recipe) => {
      console.log(recipe,' [ Updating success ]');
    }).catch((err) => {
      console.log('An error happened: ',err);
    });

  Recipe.deleteOne({title: 'Carrot Cake'})
    .then((recipe) => {
      console.log('The recipe: [',recipe,'] has been deleted.');
    })
    .catch((err) => {
      console.log('An error happened: ',err);
    });

}

function closeConect() {
  mongoose.connection.close(() => {
    console.log('Connection is closed.');
  });
}

setTimeout(modifiedRecipe, 1000);
setTimeout(closeConect, 1500);
  