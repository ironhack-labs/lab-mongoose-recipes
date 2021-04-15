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
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  const recipe1 =  {
    "title": "Huevos fritos",
    "level": "Easy Peasy",
    "ingredients": [
      "2 pounds red onions, sliced salt to taste",
      "2 (16 ounce) boxes uncooked rigatoni",
      "1 tablespoon chopped fresh marjoram leaves",
      "1 pinch cayenne pepper",
      "2 tablespoons freshly grated Parmigiano-Reggiano cheese"
    ],
    "cuisine": "Italian",
    "dishType": "main_course",
    "image": "https://images.media-allrecipes.com/userphotos/720x405/3489951.jpg",
    "duration": 220,
    "creator": "Chef Luigi"
  };

  Recipe.create(recipe1)
    .then(recipe => {
      console.log(`Recipe created: ${recipe.title}`)
    })
    .catch(error=>console.error(error));

  Recipe.insertMany(data)
  .then(data => {
    console.log(`Recipe created ${data.length}`)
  })
  .catch(error => console.error(error));

  Recipe.find({}, { title: 1, _id: 0 })
  .then(recipe => console.log(recipe))
  .catch(error => console.error(error))

  Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {$set:{duration: 100}}, {new: true})
  .then(recipe => {console.log(recipe)})
  .catch(error => console.error(error))

  Recipe.deleteOne({title: "Carrot Cake"}, )
  .then(recipe => {console.log("Yuhu")})
  .catch(error => console.error(error))

  mongoose.connection.close();
  





