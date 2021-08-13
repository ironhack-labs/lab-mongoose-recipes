const mongoose = require('mongoose');
mongoose.set("useFindAndModify", false);
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

  /////////////////// Iteration 2 /////////////////////
  // .then(() => {
    //   Recipe
    // .create(
      //   {
        //     title: "Asian Glazed Chicken Thighs",
        //     level: "Amateur Chef",
        //     ingredients: [
          //       "1/2 cup rice vinegar",
          //       "5 tablespoons honey",
          //       "1/3 cup soy sauce (such as Silver Swan®)",
          //       "1/4 cup Asian (toasted) sesame oil",
          //       "3 tablespoons Asian chili garlic sauce",
          //       "3 tablespoons minced garlic",
          //       "salt to taste",
          //       "8 skinless, boneless chicken thighs"
          //     ],
          //     cuisine: "Asian",
          //     dishType: "main_course",
          //     image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
          //     duration: 40,
          //     creator: "Chef LePapu"
          //   }
          // )
          
          //   .then(( newlyCreatedRecipe ) => console.log(`Newly Created Recipe: ${newlyCreatedRecipe.title}`))
          // })



  /////////////////// Iteration 3 /////////////////////
          Recipe.insertMany(data)
          .then((array) => array.forEach((recipe) => console.log(`Title: ${recipe.title}`)) )
          
          

/////////////////// Iteration 4 /////////////////////
          .then(() => { 
              Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 } )
              .then(() => console.log(`Document has been updated`))
          })



/////////////////// Iteration 5 /////////////////////
          .then(() => {
            Recipe.deleteOne({ title: 'Carrot Cake'}, (err, item) => {
              if (err) console.log(`Could not remove record`);
              else console.log(`Record was removed successfully - Deleted ${item.deletedCount} item(s).`);
            })
/////////////////// Iteration 6 /////////////////////
            .then(() => { 
            mongoose.connection.close()
          })
})

          .catch(error => {
            console.error('Error connecting to the database', error);
          });