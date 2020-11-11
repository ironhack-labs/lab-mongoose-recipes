const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false)

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
    /* ------> Iteration 2 <------ */
    Recipe.create({
      title: "Veggie Noodles",
      level: "Easy Peasy",
      ingredients: ["noodles", "onions", "carrots", "snap peas", "garlic", "soy sauce"],
      cuisine: "Japanese",
      dishType: "main_course",
      image: "https://img.hellofresh.com/c_fit,f_auto,fl_lossy,h_500,q_auto,w_1260/hellofresh_s3/image/veggie-noodle-stir-fry-v-84780780.jpg",
      duration: 1,
      creator: "Sara",
      created: 2020-11-11,
    })
    .then(theNewRecipe => console.log('The recipe is:', theNewRecipe.title))    
    .catch(err => console.log('Error creating recipe:', err))
      
      /* ------> Iteration 3 <------ */
      .then(() => {
         Recipe.insertMany(data)
        .then(newRecipes => newRecipes.forEach(elm => console.log('Recipes are:', elm.title)))    
        .catch(err => console.log('Error creating recipes:', err))

           /* ------> Iteration 4 <------ */
           .then(() => {
              Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
              .then(updatedRecipe => console.log("Updated successfully!: ", updatedRecipe.title))
              .catch(err => console.log('Error updating recipe', err))
             
                /* ------> Iteration 5 <------ */
                .then(() => {
                  Recipe.deleteOne({ title: "Carrot Cake" })
                    .then(deletedRecipe => console.log("Deleted successfully!: ", deletedRecipe.title))
                    .catch(err => console.log('Error deleting recipe', err))
                  
                    /* ------> Iteration 6 <------ */
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

