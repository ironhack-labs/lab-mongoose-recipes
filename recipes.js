const mongoose = require('mongoose');
const Schema  = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
.then(()=> {
console.log('Connected to Mongo!');
}).catch(err => {
  console.error('Error conecting to mongo', err);
});

let schema =  new Schema({
    title: {
      type: String,
      required: true,
      unique: true,
    },
    level: {
      type: String,
      enum: ["Easy Peasy","Amateur Chef", "UltraPro Chef"],
    },
    ingredients:{
      type: Array
    },
    cuisine: {
      type: String,
      required: true,
    },
    dishType: {
      type: String,
      enum: ['Breakfast','Dish','Snack','Drink','Dessert','Other'],
    },
    image: {
      type: String,
      default: 'https://images.media-allrecipes.com/images/75131.jpg',
    },
    duration: {
      type: Number,
      min: 0,
    },
    creator: {
     type: String,
    },
    created: {
      type: Date,
      default: Date.now,
    }
  }, {timestamps: true});

  const Recipe = mongoose.model('Recipe', schema);

  //2.Create a new recipe
    let milanese = {
      title: 'Milanese with Mexican beans',
      level: 'Begginer',
      ingredients: ['1 kilogram Chicken breasts', '1 garlic', '300gr of beans', '1 lemon', '1 cup of breadcrumbs' ],
      cuisine: 'Spanish',
      dishType: ['Dish'],
      image: 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjvoeTcr6jgAhUM16wKHYGdDh4QjRx6BAgBEAU&url=https%3A%2F%2Fwww.kiwilimon.com%2Freceta%2Fcarnes-y-aves%2Fcerdos%2Fchuletas-de-cerdo%2Fmilanesa-de-cerdo-sencilla&psig=AOvVaw2kgOqQVsXShtXeV1HCODln&ust=1549585966241735',
      duration: 20,
      creator: 'AndresHM'
  };

  Recipe.create(milanese)
  .then((recipe) => console.log(`New recipe created : ${recipe.title}`))
  .catch(err => console.log("An error to create the new recipe:", err));

  //3
  Recipe.insertMany(data)
  .then(recipes => {
    recipes.forEach(recipe => console.log(`New recipe created: ${recipe.title}`));
  })
  .catch(err => console.log("Error adding all recipes:", err));

  //4
