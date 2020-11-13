const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';


//Functions

//Create one recipe

const random = Math.floor(Math.random() * data.length);

const createOneRecipe = () => {

  Recipe.create(data[random])
    .then((element) => {
      console.log(`This recipe was created: ${data}`);
    })
    .catch((err) => {
      console.log(`There was an error: ${err}`);
    })

}


//Create many recipes

const createManyRecipes = () => {

  Recipe.insertMany(data)
    .then((recipes) => {
      recipes.forEach((recipes) => {
        //console.log(`This recipe was created: ${recipes}`);
      })
    })
    .catch((err) => {
      console.log(err);
    });

}

//Update recipe

const updateRecipe = (title) => {

  Recipe.updateOne({ title: title }, { duration: 100 })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err)
    });

}


//Delete recipe

const deleteRecipe = () => {

  Recipe.deleteOne({ title: `Carrot Cake` })
    .then((data) => {
      console.log(data);

    })
    .catch((err) => {
      console.log(err);
    });
}



// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    
    // createOneRecipe();
    createManyRecipes();
    updateRecipe('Rigatoni alla Genovese');
    // deleteRecipe();



  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });



