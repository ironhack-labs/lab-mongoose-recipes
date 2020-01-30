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
  .then(async x =>{
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    //iteracion2
    const recipe ={
      title: 'conejitos cake',
      level: 'UltraPro Chef',
      ingredients: ['Flour 180 grs', 'baking powder 1-1/2 sp', '3 eggs', 'whipping cream 200ml', 'chocolate-milk 200grs', 'sugar 180grs', 'conejitos chocolate 5pzs'],
      cuisine: 'French',
      dishType: 'Dessert',
      duration: 120,
      creator: 'Chef Pepe Le Pu',
    }
   const firstRecipe =await Recipe.create(recipe)
   console.log(firstRecipe.title)
   await Recipe.insertMany(data)
   await Recipe.find({}, {title: 1, _id: 0})
   .then(titulo =>{
     titulo.forEach(name =>{console.log(name.title)})
   })
  const update= await Recipe.updateOne({title:  'Rigatoni alla Genovese'},{duration: 100}, {new: true})
  console.log(update)
   const del = await Recipe.deleteOne({title: 'Carrot Cake'})
  console.log(del)

    mongoose.connection.close()
  })

 


  
  .catch(err => console.error('Error connecting to mongo', err));
