const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'



const myRecipe = {
  title: 'Ensalada de atún',
  level: 'Easy Peasy',
  ingredients: ['lechuga', 'atun', 'cebolla', 'jitomate'],
  cuisine: 'International',
  dishType: 'Dish',
  image:'',
  duration:10,
  creator: 'Carlos Fabian',
  date: ''
}

// Connection to the database "recipeApp"


mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .then( async x => {
    
//iteracion 2
  let create = await Recipe.create(myRecipe)
  //.then(myRecipe => console.log(myRecipe.title))
  //.catch(err => console.log(err))

//iteracion 3
  let insert = await Recipe.insertMany(data)
  Recipe.find({},{title:1, _id:0})
  .then(recipes => recipes.forEach( recipe => console.log(recipe.title)))
  //.catch(err => console.log(err))

//iteracion 4
let update = await Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100}, {new: true})
//.then( response => console.log('Update completed'))
//.catch( err => console.log(err))

//iteracion 5
let deleted = await Recipe.deleteOne({title: 'Carrot Cake'})
//.then(res => console.log('Carrot cake deleted'))
//.catch(err => console.log(err))

//iteracion 6
let closed = await mongoose.connection.close()
    })
    .catch(err => console.error('Error connecting to mongo', err))


  
    
  
  

  
  
  
