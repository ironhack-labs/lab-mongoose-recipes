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


  // Recipe.create({
  //     title: "Pot au feu",
  //     level:"Easy Peasy", 
  //     ingredients:"meat and vegetables",
  //     cuisine:"French",
  //     dishType: "Dish",
  //     duration: 20,
  //     creator: "the French",
  //     created: ""
  //   }).then(reponse => {console.log(reponse.title)}).catch(err => console.log(err))
    

  Recipe.insertMany(data)

  
function updateRecipeDuration(title, newDuration) {
  
  Recipe.findOneAndUpdate({title:title}, { duration: newDuration })
    .then(res => {
      console.log("Recipe duration updated", res);
    })
    .catch(err => {
      console.error(err);
    });
}

updateRecipeDuration("Rigatoni alla Genovese", 100)


Recipe.findOneAndDelete({
  title: "Carrot Cake"
}).then(response => {console.log("deleted!!!")}).catch(err => console.log(err))

setTimeout(mongoose.connection.close, 5000)