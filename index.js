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
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: "Pizza",
      level: "UltraPro Chef",
      ingredients: ["Tomato", "Mozzarella", "Meal"],
      cuisine: "Italian",
      dishType: "main_course",
      duration: 20,
      creator: "Hai and Simone"
    })
      .then(recipe => {
        console.log(`New receive '${recipe.title}' is added!`);
      })
      // nested queries because it is async, the findOneAndUpdate or deleteOne may be excecuted before the insertMany finishs its works.
      .then(() => {
        Recipe.insertMany(data)
          .then(recipes => recipes.forEach(recipe => console.log(`New receive '${recipe.title}' is added!`)))
          .then(() => {
            Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true})
              .then(recipe => console.log(`'${recipe.title}' is successfully updated!`))
              .catch(error => console.log('Error updating a recipe', error));
            Recipe.deleteOne({title: "Carrot Cake"})
              .then(result => {
                if (result.deletedCount > 0) console.log('Successfully deleted recipes!');
                else console.log("No recipe deleted, make sure you enter the correct title");
                mongoose.connection.close();
              })
              .catch(error => console.log('Error deleting a recipe', error));
          })
          .catch(error => console.log('Error creating new recipes', error));
      })
      .catch(error => console.log('Error creating new recipe', error));
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


