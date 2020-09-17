const mongoose = require('mongoose');


// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

mongoose.set("useFindAndModify", false);

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
    // const newRecipe = await Recipe.create({
    //   title: "Kimchi Fried Rice",
    //   level: "Easy Peasy",
    //   ingredients: [
    //     "2 tablespoons rice vinegar",
    //     "2 cups cooked rice",
    //     "2 cups kimchi",
    //     "2 tablespoons (toasted) sesame oil",
    //     "3 tablespoons Asian chili garlic sauce",
    //     "3 tablespoons minced garlic",
    //     "2 green onions",
    //   ],
    //   cuisine: "Asian",
    //   dishType: "main_course",
    //   image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
    //   duration: 20,
    //   creator: "Some Korean guy"
    // });
    // console.log(newRecipe.title);
    // Run your code here, after you have insured that the connection was made
   const newRecipes = await Recipe.insertMany(data);
   newRecipes.forEach(recipe => console.log(recipe.title));

   const updateRecipe = await Recipe.findOneAndUpdate(
     {title: "Rigatoni alla Genovese"},
     {duration: 100},
     {new: true}
   );
   console.log("Successfull update!");
  
   const deleteRecipe = await Recipe.deleteOne(
     {title: "Carrot Cake"}
   );
   console.log("Successfull delete!");
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  mongoose.connection.close();
  console.log(mongoose.connection.readyState === 3 ? "\r\nConnection closed" : "\r\nPending");