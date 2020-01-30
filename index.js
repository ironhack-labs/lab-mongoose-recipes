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
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err))
  .then(async x=>{
  let receta= await Recipe.create({ 
  title: 'Hot dog',
  level: 'Easy Peasy',
  ingredients: ['8 salchichas viena','8 panes para hot dog','al gusto Mayonesa','al gusto Catsup','al gusto Salsa o chiles en escabeche'],
  cuisine:'Fast Food',
  dishType:'Other',
  image: 'https://img-global.cpcdn.com/recipes/d47004c4148acee1/751x532cq70/hot-dog-sencillos-foto-principal.jpg',
  duration: 20,
  creator: 'Chef Isra',
  created:Date.now()
 })
.then(Recipe => console.log(`Title of Recipe: ${Recipe.title}`))
.catch(error =>
  console.log('Error', error)
)

let recetas= await Recipe.insertMany(data)
  .then(Recipe => Recipe.forEach(y=>console.log(`Title of Recipe: ${y.title}`)))
  .catch(error => console.log('Error: ', error))


let actualizado= await Recipe.updateOne({
  title: "Rigatoni alla Genovese"
},
{ duration: 100},{new:true})
.then(Recipe => {
console.log("Recipe updated")})

let borrar= await Recipe.deleteOne({
title: "Carrot Cake"
})
.then(Recipe=>{ console.log ("Recipe Delet")})

mongoose.connection.close()
})


 