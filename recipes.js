const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');
const Receipe = require("./models/recipe")

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });



Receipe.create({
  title: 'Rigatoni alla Genovese',
        level: 'Easy Peasy',
        ingredients: ['2 pounds red onions, sliced salt to taste', '2 (16 ounce) boxes uncooked rigatoni', '1 tablespoon chopped fresh marjoram leaves', '1 pinch cayenne pepper', '2 tablespoons freshly grated Parmigiano-Reggiano cheese'],
        cuisine: 'Italian',
        dishType: ['Dish'],
        image: 'https://images.media-allrecipes.com/userphotos/720x405/3489951.jpg',
        duration: 220,
        creator: 'Chef Luigi'
})
.then(receipe => {console.log("The title is: ", receipe.title)})
.catch(err => {console.log("An error happened", err)})


Receipe.insertMany(data)
.then(recipe => console.log("Recipe created: ", recipe[0].title))
.catch(err => console.log(err))

Receipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
.then(success => console.log("changed the duration of one recipe"))
.catch(err => console.log(err))

Receipe.deleteOne({title: "Carrot Cake"})
.then(deleted => console.log("Carrot cake is no longer available"))
.catch(err => console.log(err))

//no estoy seguro si la linea de abajo sea la manera correcta de cerrar la conexion :(
//mongoose.connection.close(() =>console.log("Mongoose default connection is disconnected due to application termination"))