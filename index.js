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
  .then(async () => {
    // Run your code here, after you have insured that the connection was made
  //   const newRecipe = [
  //     {
  //       "title": "Adobo",
  //       "level": "Peasy",
  //       "ingredients": [
  //         "1/2 cup rice vinegar",
  //         "5 tablespoons honey",
  //         "1/3 cup soy sauce (such as Silver Swan®)",
  //         "3 tablespoons minced garlic",
  //         "salt to taste",
  //         "whole black pepper",
  //         "2 laurel leaves",
  //         "8 skinless, boneless chicken thighs",
  //       ],
  //       "cuisine": "Asian",
  //       "dishType": "main_course",
  //       "image": "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F5147351.jpg&w=798&h=798&c=sc&poi=face&q=85",
  //       "duration": 40,
  //       "creator": "Chef Ann"
  //     }
  //   ];
  // })
  

    const resdb = await Recipe.create(data[0]);
    console.log(resdb.title);

    const resMany = await Recipe.insertMany(data);
    for (let i = 0; i < data.length; i++) {
      console.log(resMany[i].title);
    }

    const updateRecipe = await Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100});
    console.log ("Update successful!");

    const deleteRecipe = await Recipe.deleteOne({ title: "Carrot Cake" });
    console.log ("Deleted!");

    mongoose.connection.close();
});

  .catch(error => {
    console.error('Error connecting to the database', error);
  });



  

   