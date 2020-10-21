const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe');

// Import of the data from './data.json'

const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const nuevareceta = {
  title: "Asian pro food",
  level: "Amateur Chef",
  ingredients: [
    "1/2 cup rice vinegar",
    "5 tablespoons honey",
    "1/3 cup soy sauce (such as Silver Swan®)",
    "1/4 cup Asian (toasted) sesame oil",
    "3 tablespoons Asian chili garlic sauce",
    "3 tablespoons minced garlic",
    "salt to taste",
    "8 skinless, boneless chicken thighs"
  ],
  cuisine: "Asian",
  dishType: "main_course",
  image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
  duration: 40,
  creator: "Chef LePapu"
}
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
    return console.log("Connected to Mongo!");
  })
  .then(() =>{
    return Recipe.create(nuevareceta)
    .then(result => console.log(result.title))
    .catch(error => console.log(error.message))
  })
  .then(()=>{
    console.log("insert")
    return Recipe.insertMany(data)
  })
  .then((result)=>{
    return result.forEach(recipe=>{console.log(recipe.title)})})
  .then(()=>{
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100} )
    .then(()=>console.log("Receta actualizada"))
    .catch(error => console.log(error.message));
  })
  .then(()=>{
    return Recipe.deleteOne({title: "Carrot Cake"})
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log(
        "Mongoose default connection disconnected through app termination"
      );
      process.exit(0);
    });
  });
