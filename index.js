const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { model } = require('./models/Recipe.model');
const dataJson = require("./data.json");


const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
mongoose.set('returnOriginal', false);


const firstRecipeData = {
  title: "peperroni pizza",
  level: "Easy Peasy",
  ingredients: ["dough", "tomato", "chesse", "pepperoni"],
  cuisine: "italian",
  dishType: "main_course",
  image:"https://www.istockphoto.com/fr/photo/pizza-au-pepperoni-savoureux-et-le-cuisson-ingr%C3%A9dients-tomates-basilic-sur-fond-noir-gm1083487948-290669894", 
  duration: 45,
  creator: "Pompeo",
  created: Date.now()
};

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
    Recipe.create(firstRecipeData).then(recipe => console.log(recipe.title))
    
    .then(() => { 
      Recipe.insertMany(dataJson).then(recipes => console.log(recipes.map(recipe => recipe.title)))
      
      .then(() => {
        Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true}).then(update => console.log(update))
        
        .then( () => {
          Recipe.deleteOne({title: "Carrot Cake"}).then(result => console.log(result)).catch(err => console.log(err))

          .then(() => {
            mongoose.connection.close()
          })
        })
      })
    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });