

const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany();
  })
  .then(() => {
    return Recipe.create({
      title: 'Fish Stew',
      level: 'Easy Peasy',
      ingredients: ['carrot', 'pumpkin', 'fish', 'apple', 'pinecone'],
      cuisine: 'Mystic Trails',
      dishType: 'main_course',
      image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpotion-permit.fandom.com%2Fwiki%2FMeat_Stew&psig=AOvVaw1tdgoWxgDCqCVuIVC1w08m&ust=1687611712434000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCPj8iuC52f8CFQAAAAAdAAAAABAD',
      duration: 480,
      creator: 'Sensei'
    })
  })
  .then((result) => {
    console.log("new recipe created", result);
    return Recipe.insertMany(data);
  })
  .then((result) => {
    console.log("succes, 5 recipes added", result);
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { $set: { duration: 100 }}, { new: true });
  })
  .then((result) => {
    console.log("recipe updated", result);
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then((result) => {
    console.log('recipe deleted', result);
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally(() => {
    mongoose.connection.close();
  });
