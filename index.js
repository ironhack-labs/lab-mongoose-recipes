const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'



// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
});


Recipe.create({
  title: 'Carnitas3',
  level: 'Easy Peasy',
  ingredients: ['3 1/2 pounds boneless pork shoulder, cut into large pieces', '1 tablespoon freshly ground black pepper', '1 tablespoon kosher salt, or more to taste', '2 tablespoons vegetable oil', '2 bay leaves', '2 teaspoons ground cumin', '1 teaspoon dried oregano', '1/4 teaspoon cayenne pepper', '1 orange, juiced and zested'],
  cuisine: 'American',
  dishType: 'Dish',
  image: 'https://images.media-allrecipes.com/userphotos/720x405/2280918.jpg',
  duration: 160,
  creator: 'Chef Marta & Fer'
  })
  .then(created=> {
    console.log(created.title)
    Recipe.insertMany(data)
    .then(()=> {
      console.log(data)
      Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese'}, { duration: 100 })
      .then(updated => { 
        console.log(`${updated.title} duration updated to ${updated.duration}???WTF??!!`)
        Recipe.deleteOne({ title: 'Carrot Cake'})
          .then(deleted=>{
          console.log(`carrot cake deleted`)
          mongoose.connection.close();
          console.log("connection closed")
          })
        })
      })
    })
  


  





