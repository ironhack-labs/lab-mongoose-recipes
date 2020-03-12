const mongoose = require('mongoose');
const recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

//MODEL ACCESSING
  recipe
    .create({
      title: "Burritos",
      level: "Easy Peasy",
      ingredients: ["Tortilla wraps", "Tomatoes", "Cheese", "Vegetarian Spekjes", "Beans", "Onions"], 
      cuisine: "Mexican",   
      dishType: "Dish",    
      image: "",     
      duration: 25,
      creator: "Neil Gursahani",    
      created: "12-03-2020"
    })
    .then((recipe) => {
      console.log(recipe.title)
    })
    .catch((error) => {
      console.log(error)
    });


//ITERATION 3
recipe
.insertMany(data)
.then((recipe) => {
  data.forEach(element => 
    console.log(element.title)
    )
    
})
.catch((error) => {
  console.log("Error in inserting many recipes!", error)
});

//ITERATION 4
recipe
  .findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
  .then((recipe) => {
    console.log("Successfully updated Rigatoni alla Genovese to 100 minutes!")
  }) 
  .catch((error) => {
    console.log("Error - unsuccessfully updated Rigatoni alla Genovese to 100 minutes.", error)
  });

//ITERATION 5
recipe
  .deleteOne({title: "Carrot Cake"})
  .then((recipe) => {
    console.log("Successfully deleted carrot cake!")
  })
  .catch((error) => {
    console.log("Error - unsuccessfully deleted carrot cake!", error)
  });

//ITERATION 6
mongoose.connection.close();