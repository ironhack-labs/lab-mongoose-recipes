const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(`Connected to the database: "${x.connections[0].name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return x.connection.dropDatabase();
  })
  .then(x => {
    return Recipe
      .create({
          title : "Noodles",
          level : "UltraPro Chef",
          ingredients : ["Noodles","Water","Fire"],
          cuisine : "Universal",
          dishType : "Satisfactory",
          image : "https://kirbiecravings.com/wp-content/uploads/2018/02/garlic-noodles-31-700x704.jpg",
          duration : 4,
          creator : "Lemiso Elko",
          created : "2020-02-28"
      }).then(recipe=>{
        console.log("New recipie added", recipe)
      })
      .catch(error => {
        console.error('Error connecting to the database', error);
      })
  })
  .then(x => {
    return Recipe
    .insertMany(data)
    .then(recipe=>{
      console.log("New recipie added", recipe)
    })
  })
  .then(() => {
    return Recipe
    .findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration : 100})
      .then(x =>{
      console.log(`Recipe was updated`)
      }
    )
    .catch(error => {
      console.error('Recipe not updated', error);
    })
  })
  .then(()=>{
    return Recipe
    .deleteOne({title:"Carrot Cake"})
    .then(x =>{
    console.log(`Recipe was deleted`)
     }
    )
    .catch(error => {
      console.error('Recipe was not deleted', error);
    })
  }
  )
  .then(()=> {mongoose.connection.close()})
  .then(()=>{console.log("Database connection closed");
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })

