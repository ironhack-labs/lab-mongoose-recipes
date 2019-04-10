const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;
//const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: { type: Array },
  cuisine: { type: String, required: true },
  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, default: Date.now }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
    iteration2();
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  function iteration2(){
    Recipe
      .create({
        title: "Tortilla de patatas",
        level: "Easy Peasy",
        ingredients: ["potatoes", "onions", "eggs"],
        cuisine: 'Spanish',
        dishType: "Other",
        duration: 30,
        creator: "Aledia"
      })
      .then(success => {
        console.log(success.title);
        iteration3();
      })
      .catch(err => {
        console.log(err);
        iteration6();
      });
  };

  function iteration3(){
    Recipe.insertMany(data)
      .then(sucess => {
        sucess.forEach(element =>{
          console.log(element.title);
        })
        iteration4();
      })
      .catch(err => {
        console.log(err);
        iteration6();
      });
  }

  function iteration4(){
    Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration:100})
      .then(success => {
        console.log("Recipe updated!")
        iteration5();
      })       
      .catch(err => {
        console.log(err);
        iteration6();
      });
  }

  function iteration5(){
    Recipe.deleteOne({title: "Carrot Cake"})
        .then(success => {
          console.log("Recipe deleted!")
          iteration6();
        })
        .catch(err => {
          console.log(err);
          iteration6();
        });
  }

  function iteration6(conn){
    mongoose.connection.close()
    .then(console.log("Database closed"))
    .catch(err => {
      console.log(err);
    });
  }

