const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

  const recipeSchema = new Schema ({
    title: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
    },
    ingredients: [String ],
    cousine: {
      type: String,
      required: true,
    },
    dishType: {
      type: String,
      enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"],
    },
    image: {
      type: String,
      default: "https://images.media-allrecipes.com/images/75131.jpg",
    },
    duration: {
      type: Number,
      min: 0,
    },
    creator: {type: String },
    created: { type: Date,
      default: Date.now,
     },
  });

  const Recipe = mongoose.model("Recipe", recipeSchema);

  const squirrelSoup = new Recipe ({ title: 'Squirrel Haitian Soup',
  level: 'UltraPro Chef',
  ingredients: ['1 young Squirrel', '5 tablespoons honey', '1/3 cup soy sauce', '1/4 cup Asian (toasted) sesame oil', '3 chili peppers', '3 tablespoons minced garlic', '1 liter of Tabasco', '8 skinless, boneless squirrel thighs'],
  cousine: 'American',
  dishType: ['Dish'],
  image: 'https://i1.wp.com/un-ecureuil-dans-ma-cuisine.com/wp-content/uploads/2016/10/66-Soupe-de-lentilles-vertes-au-curry-et-saucisses.jpg?resize=768%2C576',
  duration: 60,
  creator: 'Chef Yvens'
});
squirrelSoup.save()
.then(oneRecipe => {
  console.log(`RECIPE SUCCESS ✅`, oneRecipe);
  console.log(`${oneRecipe.title}`)
})
.catch(err => {
  console.log(`RECIPE FAILED 💩`, err)
});

Recipe.insertMany(data)
.then(oneRecipe => {
  console.log(`${oneRecipe.title}`);
})
 .catch(err => {
   console.log("fail", err)
 })