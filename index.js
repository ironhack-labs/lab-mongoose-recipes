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
  .then(x =>{ console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  //iteracion2
  Recipe.create({
    title:"Sandwich",
    level:"Easy Peasy",
    ingredients:['Bread','Jam','Cheese'],
    cuisine:"Fast food",
    dishType:"Snack",
    image:'https://s3.eestatic.com/2016/03/21/cocinillas/Cocinillas_111250498_116247584_1706x960.jpg',
    duration:5,
    creator:'Alejandra Ochoa',
    created:Date.now()
  })

  //iteracion 3
  Recipe.create(data)

  Recipe.find({},{})
  .then(recipes => recipes.forEach( recipe=>console.log(recipe.title) ))
  .catch(err => console.log(err))

  //iteracion 4
  Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"},{duration:100},{new:true})
  .then(recipe=>console.log("Update done!"))
  .catch(err=>console.log(err))

  //iteracion 5
  Recipe.deleteOne({title:"Carrot Cake"})
  .then(recipe=>console.log("Recipe deleted!"))
  .catch(err=>console.log(err))

  //iteracion 6
  mongoose.connection.close()
})
  .catch(err => console.error('Error connecting to mongo', err));

  