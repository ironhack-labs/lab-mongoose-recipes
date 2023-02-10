
const mongoose = require('mongoose');

const Recipe = require('./models/Recipe.model');
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';
mongoose.set('strictQuery', true);

mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany();
  })
  .then(() => {
    const newRecipe = {
      title: 'Southern Baked Mac and Cheese',
      level: 'Easy Peasy',
      ingredients: ['elbow macaroni', 'salted butter', 'eggs', 'milk', 'extra-sharp aged cheddar cheese', 'mild cheddar cheese', 'mascarpone cheese', 'dry mustard powder', 'ground nutmeg', 'black pepper'],
      cuisine: 'American',
      dishType: 'main_course',
      image:
        'https://cheneetoday.com/wp-content/uploads/2021/05/southern-baked-mac-and-cheese-with-evaporated-milk-1024x1024.jpg',
      duration: 90,
      creator: 'unknown'
    };
    return createRecipe(newRecipe);
  })
  .then(result => console.log(`Recipe created: ${result}`))
  .then(() => Recipe.insertMany(data))
  .then(result => {
    console.log(`Created ${result.length} recipes`);
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, {duration: 100}, {new: true});
  })
  .then(result => {
    console.log(`Updated ${result.title} and new duration is: ${result.duration}`);
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then(result => {
    console.log("The recipe was deleted", result);
  })
  .catch(error => {
    console.error("Error: ", error);
  })
  .finally(() => mongoose.connection.close());

function createRecipe(newRecipe) {
  return Recipe.create(newRecipe);
}
