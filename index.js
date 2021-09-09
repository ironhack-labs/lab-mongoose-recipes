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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const newRecipe = {
      title: "Korean Cold Noodles",
     level: "Amateur Chef",
     ingredients: [
      "1 pound Korean radish",
      "3 tablespoons vinegar",
      "2 tablespoons sugar",
      "1 teaspoon salt",
      "230 grams beef brisket",
      "6 cloves of garlic",
      "salt to taste",
      "2 servings of naengmyeon noodles"
     ],
     cuisine: "Asian",
     dishType: "main_course",
     image: "https://i1.wp.com/seonkyounglongest.com/wp-content/uploads/2019/09/Naengmyeon-3.jpg?fit=1300%2C731&ssl=1",
     duration: 40,
    }

    Recipe.create(newRecipe)
    .then(result => console.log(`Created ${result.title}`))
    .then(result => {
      console.log('Added Data', result);
      return Recipe.insertMany(data, function(err, data) {
        if(err != null) {
          return console.log(err);
        }
        console.log(data.ops);
      });
    })
    .then(result => {
      console.log('Succesfully Updated!', result);
      return Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
    })
    .then(result => {
      console.log('Deleted Succesfully',result);
      return Recipe.deleteOne({ title: 'Carrot Cake'})
    })
    .then(result => {
      console.log('Database Closed', result);
      return mongoose.disconnect();
    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
