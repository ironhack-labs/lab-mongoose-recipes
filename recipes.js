const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

const recipeSchemma = new Schema({
  title: {type: String, required: true},
  level: {type: String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]},
  ingredients: Array,
  cousine: {type: String, required: true},
  dishType: {type: String, enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]},
  image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type: Number, min: 0},
  creator: String,
  created: {type: Date, default: Date.now()}
});
const recipe = mongoose.model('recipe', recipeSchemma);

function createRecipe(data){
  recipe.create(data)
  .then((recipe) => {
    console.log('correctly inserted recipe ', recipe.title);
    disconnectDB();
  })
  .catch(err => {
    console.lor('error inserting recipe: ', err);
    disconnectDB();
  })
}
function createManyRecipes(dataArr){
  // dataArr.forEach(recipe => {
  //   createRecipe(recipe);
  // });
  recipe.insertMany(dataArr)
  .then(() => {
    console.log('insertMany correct!');
    disconnectDB();
  })
  .catch((err) => {
    console.log("error inserting many: ", err);
    disconnectDB();
  })
}
function updateRecipe(filter, newData){
  recipe.updateMany(filter, newData)
  .then(() => {
    console.log("correctly updated recipe/s!");
    disconnectDB();
  })
  .catch(err => {
    console.lor('error updating many recipes: ', err);
    disconnectDB();
  })
}
function deleteRecipe(filter){
  recipe.deleteMany(filter)
  .then(() => {
    console.log("correctly deleted recipes!");
    disconnectDB();
  })
  .catch((err) => {
    console.log('error deleting many recipes: ', err);
    disconnectDB();
  })
}
function disconnectDB(){
  // mongoose.disconnect()
  mongoose.connection.close()
  .then(() => {
    console.log('disconnected!');
  })
  .catch(() => {
    console.log('error disconnected');
  })
}

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
    // createRecipe(data[0]);
    createManyRecipes(data);
    // updateRecipe({title: 'Rigatoni alla Genovese'},{duration: 100});
    // deleteRecipe({name: 'Carrot Cake'});
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

