const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'



//metemos el resto de data.js a la bbdd recipesApp

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(() => {
    return paco;
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

mongoose.connection.on("conected", () => {
  console.log("Mongoose works!");
});

//aquí iría la public creemos que de momento no hace falta
//aquí iría el views del hbs


let paco = Recipe.deleteMany()
.then(() => {
  console.log("delete")
  Recipe.create(
    {
      title: "Gazpachito",
      level: 'Easy Peasy',
      ingredients: ["Tomate", "Pepino", "Cebolla", "Ajo", "Aceite", "Pimiento", "Sal", "Vinagre"],
      cuisine: 'Spanish',
      dishType: 'Snack',
      image: 'https://danzadefogones.com/wp-content/uploads/2015/06/Gazpacho-4.jpg',
      duration: 23,
      creator: 'Agüela Pepa'
    }
  )
  .then(
    Recipe.insertMany(data)
    .then(
      Recipe.findOneAndUpdate({title: {$eq: "Rigatoni alla Genovese"}}, { $set: { duration: 100 }}, )
      .then(
        Recipe.deleteOne({title: {$eq: "Carrot Cake"}})
        .then(
          mongoose.connection.close()
        )
      )
    )
  )

})


  
  


 





