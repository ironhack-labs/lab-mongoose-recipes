const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'


// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
    
    Recipe.collection.drop()
    .then(
      Recipe.create({
        title: "Alex's Macaroni",
        level: "Easy Peasy",
        ingredients: ["macaroni", "cheese", "tomato"],
        cuisine: "Student",
        dishType: "Other",
        image: "https://www.rebanando.com/media/maxresdefault-jpg-19_crop.jpeg/rh/macarrones-con-salsa-de-tomate-natural-o-sofrito.jpg",
        duration: 15,
        creator: "Alex Cabo",
        created: "2019-07-24",
      })
      .then(recipe => {console.log("Receta creada", recipe.title)

         Recipe.insertMany(data)
        .then(newRecipes => {
          newRecipes.forEach(recipe => { console.log(recipe.title)
          })

          Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration : 100})
          .then(x => {console.log("duration updated succesfully")
          
            Recipe.deleteOne({title: "Carrot Cake"})
              .then(x => {console.log("recipe deleted correctly")
              mongoose.connection.close()
              .then(x => console.log("connection closed"))
              })
          })
        })
      })

    )

  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });



