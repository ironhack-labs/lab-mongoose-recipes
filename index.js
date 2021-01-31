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
    //Run your code here, after you have insured that the connection was made
    console.log('Iteration 2 - Create a recipe')
    Recipe
      .create({
        title: "Chilli con carne",
        level: "Amateur Chef",
        ingredients: ['onion',
          'red pepper',
          'garlic cloves',
          'oil',
          'chilli powder',
          'paprika',
          'minced beef',
          'chopped tomatoes',
          'red kidney beans',
        ],
        cuisine: "Mexican",
        dishType: "main_course",
        image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1001451_6-c8d72b8.jpg?quality=90&webp=true&resize=440,400",
        duration: 60,
        creator: "Chef Pedro Sola",
      })
      .then(recipe => {
        console.log('Successfully created recipe:', recipe);
        console.log('Iteration 3 - Insert multiple recipes')
        Recipe
          .insertMany(data)
          .then(recipes => {
            recipes.forEach((recipe) => {
              console.log(`Successfully added recipe: ${recipe.title}`)
            })
            console.log('Iteration 4 - Update recipe')
            Recipe
              .findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { useFindAndModify: false })
              .then(recipe => {
                console.log(`The recipe has been updated: ${recipe.title}`)
                console.log('Iteration 5 - Remove a recipe')
                Recipe
                  .deleteOne({ title: 'Carrot Cake' })
                  .then(() => {
                    console.log(`Successfully Deleted!`)
                    mongoose.connection.close(() => {
                      console.log('All done, closing mongoose');
                      process.exit(0)
                    })
                  })
                  .catch(e => console.error(e))
              })
          })


      })
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
