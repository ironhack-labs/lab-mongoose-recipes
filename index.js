const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
   /* return Recipe.deleteMany()*/
  })
  .then(() => {
   /*  Recipe.create({
      title: 'Lasagna',
      level: 'Amateur Chef', 
      ingredients: ['Pasta for lasagna', 'minced beef', 'mozzarella cheese', 'parmesan cheese', 'tomate sauce', 'milk', 'butter', 'all purpose flour'],
      cuisine: 'Italian',
      dishType: 'main_course',
      image: 'https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg',
      duration: 50,
      creator: 'Brenda', 
    })
    .then((firstRecipe)=> console.log(firstRecipe.title))
    .catch((err) => console.log(err));
  }) */
/* 
  Recipe.insertMany(data)
  .then((recipes) => console.log(recipes))
  .catch((err) => console.log(err)); */
   
  Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true})
  .then((recipe) => console.log('Recipe successfully updated', recipe))
  .catch((err) => console.log(err))

  Recipe.deleteOne({title: 'Carrot Cake'}, {new:true})
  .then((recipe) => console.log('Recipe successfully deleted', recipe))
  .catch((err) => console.log(err));
})

   .catch(error => {
    console.error('Error connecting to the database', error);
  })
 
  .then(() => mongoose.connection.close())
  .catch((err) => console.log(err));

  

