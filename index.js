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
    Recipe.create({
      "title": " Butter chicken",
    "level": "Amateur Chef",
    "ingredients": [
      "500g skinless boneless chicken thighs",
      "1 lemon juiced",
      "1 cup raisins",
      "2 tsp ground cumin",
      "2 tsp paprika",
      "1-2 tsp hot chilli powder",
      "200g natural yogurt",
      "2 tbsp vegetable oil",
      "1 large onion chopped",
      "3 garlic cloves crushed",
      "1 green chill",
      "thumb-sized piece ginger",
      "1 tsp garam masala",
      "2 tsp ground fenugreek",
      "3 tbsp tomato purée",
      "300ml chicken stock",
      "50g flaked almonds, toasted",
    ],
    "cuisine": "International",
    "dishType": "main_course",
    "image": "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2017/01/butter-chicken.jpg?itok=eE_5ufkS",
    "duration": 45,
    "creator": "Jennifer Joyce"
    })
    .then((recipe)=> 
    console.log(`New recipe named ${recipe.title} was added to the DB`))
    .then(() =>{
      Recipe.insertMany(data)
      .then((recipe)=>{
        recipe.forEach((element) => console.log(`Added ${element.title}`)
          )
        })
        .then(()=> {
          Recipe.findOneAndUpdate({
            title:"Orange and Milk-Braised Pork Carnitas"},
            { duration: 20 })
            .then(recipe => {
              console.log("Find recipe and update", recipe.title)
            })
          })
           .then(( )=> {
            Recipe.findOneAndDelete({
              title:"Rigatoni alla Genovese"
            })
            .then(()=> {console.log("Recipe deleted")
              mongoose.connection.close()
          })
           })
          })
        })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
