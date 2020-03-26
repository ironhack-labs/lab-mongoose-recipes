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
        title: 'Bolo da vovó',
        level: 'Easy Peasy',
        ingredients: ['farinha', 'ovos', 'amor', 'carinho'],
        cuisine: 'Comida da vovó',
        dishType: 'snack',
        image: 'https://cdn.guiadacozinha.com.br/wp-content/uploads/2019/10/bolo-da-vovo-43692.jpg',
        duration: 30,
        creator: 'Vovó Marlete',
        created: "1950-01-26"
      })
      .then(recipe => {
        Recipe
          .insertMany(data)
          .then(recipes => {
            Recipe
              .updateOne({
                title: 'Rigatoni alla Genovese'
              }, {
                duration: 100
              })
              .then(recipe => {
                Recipe
                  .deleteOne({
                    title: 'Carrot Cake'
                  })
                  .then(recipe => {
                    console.log(`${recipe.title} was deleted`)
                    mongoose.connection.close()
                  })
                  .catch(error => console.log(error))
                console.log(`${recipe.title} was updated`)
              })
              .catch(error => console.log(error))
            console.log(`${recipes.length} recipes added`)
          })
          .catch(error => console.log(error))
        console.log(recipe.title)
      })
      .catch(err => console.log(err))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });