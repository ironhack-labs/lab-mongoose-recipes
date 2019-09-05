const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(async () => {
    console.log('Connected to Mongo!');
    await Recipe.create({
      title: 'Shrimp and Grits',
      level: 'Amateur Chef',
      ingredients: ['Shrimp', 'grits', 'bacon', 'chicken broth', 'cheddar cheese', 'cilantro', 'lemon', 'shallots'],
      cuisine: "Southern Comfort",
      dishType: "Breakfast",
      image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fimage%2Flighten-up-america%2Fcajun-style-shrimp-grits-x.jpg%3Fitok%3DJjfrfgnG&w=450&c=sc&poi=face&q=85",
      duration: 60,
      creator: 'Larry Nobles',
      created: 2005-09-05
    });
    
    await Recipe.insertMany(data)
      .then((recipeDb) => {
        console.log('Congrats all of the recipes are now in the database')
      })
      .catch((err) => {
        console.log(err)
      });
    
    await Recipe.updateOne({
      title: 'Rigatoni alla Genovese'
    },
    {
      duration: 100
    })
    .then(() => {
      console.log('Congrats recipe has been updated')
    })
    .catch((err) => {
      console.log(err)
    });
    
    await Recipe.deleteOne({
      title: "Carrot Cake"
    })
    .then(() => {
      console.log('Carrot Cake has been succesfully deleted')  
      mongoose.connection.close()  
    })
    .catch((err) => {
      console.log(err)
      mongoose.connection.close()
    });
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  }) 
    
  

     

  









