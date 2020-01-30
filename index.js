const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
   //ITERATION 2
   
    const myRecipe= await Recipe.create({
        title: 'Papardelle alla Amatriciana',
        level: 'Amateur Chef',
        ingredients: ['1/2 cup pomodoro', '1 cup prosciutto ', '10 leafs albahaca', '25gr pancetta', '1/4 cup Oregano'],
        cuisine: 'Italian',
        dishType: 'Dish',
        image: 'https://myfoodbook.com.au/sites/default/files/styles/single_recipe/public/recipe_photo/P501f6da2_0.jpg',
        duration: 25,
        creator: 'Chef Jorge Aguilar',
        created:'2018-Jun-24'
    })
  
  console.log(`Recipe created: ${myRecipe.title}`)

//ITERATION 3

//Add all DATA
 await Recipe.insertMany(data);

//Show me the titles

await Recipe.find({},{title:1, _id:0})
  .then(user => {
   user.forEach(name=>{
   console.log(name.title)
   })
 }
  
  )
  .catch(error => {
    console.error('Error finding names...',error)
  });


//Iteration 4

await Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  .then(upValue=>console.log('Succesfull Update'))
  .catch(error=>{console.error('Error updating element...',error)});

//Iteration 5

await Recipe.deleteOne({ title: 'Carrot Cake' })
  .then(x=>console.log('Successfull Deleating Element'))
  .catch(error=>console.error('Error deleating element...'));


//Iteration 6
mongoose.connection.close(() => {
  console.log('Mongoose default connection disconnected through app termination');
  process.exit(0);
})



  })
  .catch(err => console.error('Error connecting to mongo', err));
