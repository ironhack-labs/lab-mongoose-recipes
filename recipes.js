const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true } )
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


 /*** ITERATION 1 - RECIPE SCHEMA ************* */ 
const schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
  },
  ingredients: {
    type: Array
  },
  cuisine: {
    type: String,
    required: true
  },
  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"],
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: {
    type: Number,
    min: 0
  },
  creator: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Recipe = mongoose.model('Recipe', schema);

/*** ITERATIÓN 2 - CREATE A RECIPE **************** */
const chickenMilanese = {
  title: 'Chicken Milanese with Crispy Potatoes, Mixed Greens, and Creamy Lemon-Chive Dressing',
  level: 'Amateur Chef',
  ingredients: ['12 ounce Chicken breasts', '1 teaspoon Garlic powder', '12 ounce Yukon gold potatoes', '2 ounce Sour cream', '1/4 ounce Chives', '1 unit Lemon', '1/2 cup Panko breadcrumbs', '2 ounce Agurula'],
  cuisine: 'Spanish',
  dishType: ['Dish'],
  image: 'https://res.cloudinary.com/hellofresh/image/upload/f_auto,fl_lossy,q_auto/v1/hellofresh_s3/image/56686da9fd2cb98d588b4567.jpg',
  duration: 35,
  creator: 'Chef Hello Fresh'
}

 Recipe.create(chickenMilanese)
  .then((recipe) => console.log(`New recipe created : ${recipe.title}`))
  .catch(err => console.log("An error happened:", err));


/*** ITERATION 3 - INSERT MANY RECIPES *************** */
Recipe.insertMany(data)
  .then(recipes => {
    recipes.forEach(recipe => console.log(`New recipe created: ${recipe.title}`));
  })
  .catch(err => console.log("An error happened:", err));
 
/*** ITERATION 4 - UPDATE RECIPE **************** */
Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
  .then(() => console.log(`'Rigatoni alla Genovese' recipe has been updated`))
  .catch(err => console.log("An error happened:", err));

/*** ITERATION 5 -REMOVE A RECIPE *************** */
Recipe.deleteOne({title: 'Carrot Cake'})
  .then(() => console.log("'Carrot Cake' recipe has been removed"))
  .catch(err => console.log("An error happened:", err));

  /*** ITERATION 6 - CLOSE THE DATABASE ************** */
process.on('SIGINT', () => {  
  mongoose.connection.close(() => { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 