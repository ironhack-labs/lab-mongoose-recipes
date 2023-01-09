const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany();
  })
  .then(() => {
    //ITERATION 2
    const myRecipe = {
      title: 'Arepa Reina Pepiada',
      level: 'Amateur Chef',
      ingredients: [
        '2 Cups of Water',
        '1 cup P.A.N White Corn Meal',
        '2 HASH Avocados',
        '2 Tbls Mayonese',
        '1 Tbs of Salt',
        '2 Cooked and Shreded Chicken Breast',
        '2 tbs Olive Oil',
      ],
      cuisine: 'Venezuelan',
      dishType: 'breakfast',
      image:
        'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2015_18/515696/arepa_reina_pepiada-today-tease-vr-150429.jpg',
      duration: 20,
      creator: 'Chef Caco',
    };

    return Recipe.create(myRecipe);
  })
  .then((rep) => {
    console.log(rep.title);
    //ITERATION 3
    return Recipe.insertMany(data);
  })
  .then((rep) => {
    rep.forEach((rep) => console.log(rep.title));
    //ITERATION 4
    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 }
    );
  })
  .then(() => {
    console.log('UPDATE WAS SUCCESSFUL');
    //ITERATION 5
    return Recipe.findOneAndDelete({ title: 'Carrot Cake' });
  })
  .then(() => {
    console.log('DELETE WAS SUCCESSFUL');
    //ITERATION 6
    mongoose.connection.close(() => {
      console.log('CONNECTION WAS CLOSED SUCCESSFULLY');
    });
  })
  .catch((error) => {
    console.error('A DATABASE ERROR OCCURED => ', error);
  });
