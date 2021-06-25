const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

// const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
const MONGODB_URI = `mongodb+srv://${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}@cluster0.qvczz.mongodb.net/recipesDB?authSource=admin&replicaSet=atlas-k5k3zo-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`;

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
    // return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  
  // ITERATION 2: CREATE A RECIPE
  //   Recipe.create({ 
  //   title: 'Asian Glazed Chicken Thighs',
  //   level: 'Amateur Chef',
  //   ingredients: [
  //     '1/2 cup rice vinegar',
  //     '5 tablespoons honey',
  //     '1/3 cup soy sauce (such as Silver Swan®)',
  //     '1/4 cup Asian (toasted) sesame oil',
  //     '3 tablespoons Asian chili garlic sauce',
  //     '3 tablespoons minced garlic',
  //     'salt to taste',
  //     '8 skinless, boneless chicken thighs'
  //   ],
  //   cuisine: 'Asian',
  //   dishType: 'main_course',
  //   image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  //   duration: 40,
  //   creator: 'Chef LePapu'
  // })
	//   .then(recipe => {
	// 	  console.log(recipe.title);
	// 	// this closes the connection
	// 	mongoose.connection.close();
	// })
	// .catch(err => console.log(err))
  // })
  // .catch(error => {
  //   console.error('Error connecting to the database', error);
  // });

  // ITERATION 3: INSERT MULTIPLE RECIPES
  // Recipe.insertMany(data)
	//   .then(recipe => {
	// 	  recipe.forEach(element => {
  //       console.log(element.title); 
  //     }); 
	// 	// this closes the connection
	// 	mongoose.connection.close();
	// })
	// .catch(err => console.log(err))
  // })
  // .catch(error => {
  //   console.error('Error connecting to the database', error);
  // });

  // ITERATION 4: UPDATE RECIPE
  // Recipe
  // .findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  // .then(updatedRecipe => {
  //    	  console.log('Recipe updated: ' + updatedRecipe.title);
  //       // this closes the connection
  //       mongoose.connection.close();
  //       })
  // .catch(err => console.log(err))
  // })
  // .catch(error => {
  //   console.error('Error connecting to the database', error);
  // });

  // ITERATION 5: REMOVE A RECIPE
  Recipe
  .findOneAndDelete({ title: 'Carrot Cake' })
  .then(deletedRecipe => {
        console.log("Recipe deleted sucessfully");
        // this closes the connection
        mongoose.connection.close();
        })
  .catch(err => console.log(err))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });