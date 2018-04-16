const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

  const recipe = new Schema({ 
    title : {
      type : String,
      required : true,
      unique : true
    },
    level : {
      type : String,
      enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
    },
    ingredients : {
      type : Array
    },
    cousine : {
      type : String,
      required : true
    },
    dishType : {
      type : String,
      enum: ['Breakfast', 'Dish', 'Snack', 'Drink','Dessert', 'Other']
    },
    image : {
      type : String,
      default : 'https://images.media-allrecipes.com/images/75131.jpg' 
    },
    duration : {
      type : Number,
      min : 0
    },
    creator : {
      type : String,
    },
    created : {
      type : Date,
      default : Date.now
    }
    });

  const Recipe = mongoose.model("Recipe", recipe);

  Recipe.create (
    { 
      title: 'Protein Pankakes',
      level: 'Easy Peasy',
      ingredients: ['1/2 cup flour', '1 banana', '1 egg', '1/2 oats', '1 tablespoons baking soda', 'salt to taste'],
      cousine: 'Vegetarian',
      dishType: ['Dessert'],
      image: 'https://www.ambitiouskitchen.com/wp-content/uploads/2017/04/Monique-Cottage-Cheese-Pancakes-4.jpg',
      duration: 20,
      creator: 'Monique'
    }
  )
      .then((recipe) => {
      console.log(recipe.title);
      })
      .catch((err) => { 
        console.log('An error happened:', err);
      });

  Recipe.insertMany(data)
    .then((data) => {
      data.forEach((recipe) => {
        console.log(recipe.title);
      });
    })
    .catch((err) => {
      console.log('An error happened:', err);
    });

  Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
      .then(() => {
        console.log("Updated recipe!");
      })
      .catch((err) => {
        console.log("Failed update: ", err);
      });

  Recipe.remove ({title : 'Carrot Cake'})
    .then (() => {
      console.log('Removed the carrot cake recipe!');
    })    
    .catch((err) => {
      console.log("Failed to remove: ", err);
    });

    // mongoose.disconnect();