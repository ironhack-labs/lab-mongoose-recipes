const mongoose = require('mongoose');
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model.js');
const data = require('./data.json');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    const newRecipe = {
      title: "Asian Glazed Chicken Thighs",
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
      dishType:"main_course",
      image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 40, 
      creator: "Chef LePapu",
    };
    return Recipe.create(newRecipe);
  })
.then((dataFromDB) => {
  console.log(dataFromDB.title);
  Recipe.insertMany(data)
})

.then(()=> {
  return Recipe.findOneAndUpdate(
    {title:"Rigatoni alla Genovese"}, 
    {duration: 100})
})
.then(()=> {
  console.log('Recipe is updated!')
})
.then(()=>{
  return Recipe.deleteOne(
    {title: "Carrot Cake"}
)
})
.then((deletedRecipe)=> {
  console.log("Recipe is deleted", deletedRecipe)
})
.catch(error => {
  console.error('Error connecting to the database', error);
})
.then(()=>{
  mongoose.connection.close();
  console.log('connection closed')
})
    