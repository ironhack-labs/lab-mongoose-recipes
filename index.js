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
    /*Recipe.create(  {
      "title": "Chocolate Brownies",
      "level": "Amateur Chef",
      "ingredients": [
        "1/2 cup light brown sugar",
        "1 large egg",
        "2 tablespoons milk",
        "1 1/4 teaspoons vanilla extract",
        "2 cups semisweet chocolate chips"
      ],
      "cuisine": "French",
      "dishType": "dessert",
      "image": "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F4398987.jpg&w=596&h=399.32000000000005&c=sc&poi=face&q=85",
      "duration": 45,
      "creator": "Chef Mystery"
    })
    .then(recipe => console.log('The recipe is saved and the title is: ', recipe.title))
    .catch(error => console.log('An error occured while saving a new recipe:', error))*/
  })
  .then(async() => {
   await Recipe.insertMany(data)
  .then(recipes => recipes.forEach(recipe => console.log(`Recipe Title: ${recipe.title} ${recipe.duration}`)))
  .catch(error => console.log('An error occured while saving a new recipe:', error))
  })
  .then(async() => {
    const updatedRecipe = await Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true});
    console.log(`Successfully updated: ${updatedRecipe.title}, Duration: ${updatedRecipe.duration}`);
  })
  .then(async() => {
    await Recipe.deleteOne({title: "Carrot Cake"});
    console.log(`Successfully removed: Carrot Cake`);
  })
  .then(() => {
    mongoose.connection.close();
    mongoose.connection.readyState === 3 ? console.log("Connection closed") : console.log("Connection NOT closed");
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });




/*Refactored

Iteration 4
  async function update () {
    try{const updatedRecipe = await Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true});
    console.log(`Successfully updated: ${updatedRecipe.title}, Duration: ${updatedRecipe.duration}`);}
    catch {console.log("error")};
  }
update();

Iteration 5
async function deleteRecipe() {
  const removeRecipe = await Recipe.deleteOne({title: "Carrot Cake"});
  console.log(`Successfully removed: Carrot Cake`);
}
deleteRecipe();
*/
