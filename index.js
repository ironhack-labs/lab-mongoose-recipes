const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');

    Recipe.deleteMany({}).then(result=>console.log(result)).catch(err=>console.log(err))
    
    const MaPoTofu = {
      title: "Mapo Tofu",
      level: "Amateur Chef",
      ingredients: ["Sichuan Peppercorn", "Dried Red Peppers", "Tofu", "Pork or Beef"],
      cuisine: "Chinese",
      dishType: "Dish",
      duration: 30,
    }

    Recipe.create(MaPoTofu)

    Recipe.insertMany(data)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.error("Error inserting many", err))
    
    Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
      .then(res => {
        console.log("Successfully Updated Recipe!");
        console.log(res);
      })
      .catch(err => console.error("Error updating", err))

    Recipe.deleteOne({title: "Carrot Cake"})
      .then(res => {
        console.log("Successfully Deleted Recipe!");
        console.log(res);
      })
      .catch(err => console.error("Error deleting", err))


  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

      // mongoose.disconnect()
      //   .then(console.log("Successfully disconnected") )
        // .catch(console.error("Error disconnecting", err));
