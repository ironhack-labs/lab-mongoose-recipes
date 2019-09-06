const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'


const myRecipe = {
  title: 'Cheesy Chicken Penne Bake',
  level: 'Amateur Chef',
  ingredients: ['milk', 'eggs', 'shellfish','tree nuts','wheat','soybean'],
  cuisine: 'Italian',
  dishType: 'Dish',
  image: 'https://res.cloudinary.com/hellofresh/image/upload/f_auto,fl_lossy,h_400,q_auto/v1/hellofresh_s3/5d6046777aa3c20014588bde/step-1ef956d8.jpg',
  duration: 30,
  creator: 'Karina Mora'
}

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  //  Recipe.create(data)
  
  .then(() => {
    console.log('Connected to Mongo!')
   
   
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });


Recipe.create(myRecipe)  
.then(() => {
    console.log(`Connected to Mongo! and the title of the recipe is ${this.Recipe.title}`);
    mongoose.connection.close()
  }).catch(err => {
    console.error('Error connecting to mongo', err)
    mongoose.connection.close()
  })


Recipe.findOneAndUpdate({
title: 'Rigatoni alla Genovese'
}, 
{
$set: { duration: 100 }
})

.then(() => {
console.log('sucess :)')
mongoose.connection.close()
})

.catch(error => {
console.error('Error connecting to mongo', error)
mongoose.connection.close()
  })


Recipe.deleteOne({
title: 'Carrot Cake'})

.then(() => {
console.log('byeeeee')
mongoose.connection.close()
})

.catch(error => {
console.error('Error connecting to mongo', error)
mongoose.connection.close()
  })
  })