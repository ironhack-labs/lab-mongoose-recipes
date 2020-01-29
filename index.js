const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

const chilaquiles = {
  title: 'Chilaquiles',
  level: 'Easy Peasy',
  ingredients: ['Tortilla','Salsa Verde','Queso','Crema','Chop Onion','Perejil'],
  cuisine: 'Mexican',
  dishType: 'Other',
  duration: 5,
  creator: 'Juan Chilaquiles'
}

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    // //Itineration 2
    // Recipe.create(chilaquiles)
    //   .then(newData => console.log(newData))
    //   .catch(err => console.log(err))
    // //Itineration 3
    // Recipe.create(data)
    //   .then(newData => newData.map(recipe => console.log(recipe.title)))
    //   .catch(err => console.log(err))
      //Iteracion 4
    Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"},{duration:100},{new:true})
      .then(newData => console.log('Update Completo'))
      .catch(err => console.log(err))
      //Iteracion 5
    Recipe.findOneAndDelete({title:'Carrot Cake'})
      .then(newData => console.log('Borrado Carrot Cake'))
      .catch(err => console.log(err))
  })
  .catch(err => console.error('Error connecting to mongo', err));

  //Iteracion 6
  
  mongoose.connection.close()
