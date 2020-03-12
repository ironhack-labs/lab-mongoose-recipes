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
  .catch(err => console.error('Error connecting to mongo', err));

  Recipe.create(data)
  .then(recipe=> console.log(recipe))
  .catch(error=>console.error(error))
  Recipe.insertMany(data)
  .then(recipe=> console.log(recipe))
  .catch(error=>console.error(error))
  Recipe.update({title:"Rigatoni alla Genovese"},{duration:100})
  .then(recipe=> console.log(recipe))
  .catch(error=>console.error(error))
  Recipe.deleteOne({title:"Carrot Cake"})
  .then(recipe=> console.log(recipe))
  .catch(error=>console.error(error))
  mongoose.connection.close()

 
  