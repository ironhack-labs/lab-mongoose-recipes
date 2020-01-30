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
  //Promises - async await.
  //The then is executed if all works properly.
  .then(async x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)//Connect to the database. This logs to the console.
    //Here we create a new recipe with all the keys and respective values established in our Schema.
    const hotCakes = {
      title: 'Hot cakes',
      level: 'Easy Peasy',
      ingredientes: [
      'Half cup of milk', 
      'Two eggs', 
      'Buttermilk', 
      'Cupcake powder',
      'Honey'],
      cuisine: 'American',
      dishType: 'Breakfast',
      image: '/Hotcake/hotcakes.jpg',
      duration: 20,
      creator: 'Luis'
    }
    //This are the process on await.
    //Each one will be resolved on their respective time without interrupting the execution of the code.
    await Recipe.create(hotCakes)//Creates new recipe hotCakes.
    await Recipe.insertMany(data)//Inserts the data in data.js on our data base.
    await Recipe.find({}, {title: 1, _id: 0})//Finds only the titles of our recipes.
      .then(title => {
       title.forEach(recipeName => (console.log(recipeName.title)))
      })//Logs only the title of our recipes in the terminal.
    await Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100}, {new: true})
    //With the selectors we get the recipe which it's title is the one mentioned and update it's information on the duration key to 100.
    await Recipe.deleteOne({title: 'Carrot Cake'})//Delete recipe with title Carrot Cake.
    //We close the connection to the database.
    mongoose.connections.close()
  })
  .catch(err => console.error('Error connecting to mongo', err));//If something goes wrong the catch is executed and the error is logged to the terminal.
  

  
 
  
  
  
  
