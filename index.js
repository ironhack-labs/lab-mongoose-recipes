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
    //==============Iteration 2 Create a recipe
    // Recipe.create({
    //   "title": "Asian Glazed Chicken Thighs",
    //   "level": "Amateur Chef",
    //   "ingredients": [
    //     "1/2 cup rice vinegar",
    //     "5 tablespoons honey",
    //     "1/3 cup soy sauce (such as Silver Swan®)",
    //     "1/4 cup Asian (toasted) sesame oil",
    //     "3 tablespoons Asian chili garlic sauce",
    //     "3 tablespoons minced garlic",
    //     "salt to taste",
    //     "8 skinless, boneless chicken thighs"
    //   ],
    //   "cuisine": "Asian",
    //   "dishType": "main_course",
    //   "image": "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
    //   "duration": 40,
    //   "creator": "Chef LePapu"
    // })  
    // .then(recipe => console.log('The recipe is created, title: ', recipe.title))
    // .catch(error => console.log('An error happened while creating recipe:', error));
  
    //==============Iteration 3 Insert multiple recipes

    Recipe.insertMany(data)
    .then(array=> {
      array.forEach(recipe=> {
        console.log('The recipe is created, title: ', recipe.title)
      });
          //==============Iteration 4 Update recipe
    
    Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, {new:true})
    .then(recipe=> { console.log("duration update was a success! new duration: ", recipe.duration) 
  
    //==============Iteration 5 Remove a recipe

    Recipe.deleteOne({title: "Carrot Cake"})
    .then(recipe=> {console.log("recipe was deleted!", recipe)
    
    //==============Iteration 6 Close DB

    mongoose.connection.close();
  })
    .catch(error=> console.log("Error trying to delete recipe ", error));

  })
    .catch(error=> console.log("could not update, error: ", error));
    })
    .catch(error => console.log('An error happened while creating all recipes:', error));
  
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

