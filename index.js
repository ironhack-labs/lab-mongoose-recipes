  const express = require('express');
  const mongoose = require('mongoose');
  const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
  const data = require('./data.js');  // Import of the data from './data.js'

  const app = express();

  // Connection to the database "recipeApp"
  mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
    .then(() => {
      console.log('Connected to Mongo!');
  
    }).catch(err => {
      console.error('Error connecting to mongo', err);
    });
/////////////////////////////////////////////////////////////////

 

    let createRecipe = async(req, res) => {
      await Recipe.create({
        title: 'Rigatoni alla Bolognesa',
        level: 'Easy Peasy',
        ingredients: ['2 pounds red onions, sliced salt to taste', '2 (16 ounce) boxes uncooked rigatoni', '1 tablespoon chopped fresh marjoram leaves', '1 pinch cayenne pepper', '2 tablespoons freshly grated Parmigiano-Reggiano cheese'],
        cuisine: 'Italian',
        dishType: 'Dish',
        image: 'https://images.media-allrecipes.com/userphotos/720x405/3489951.jpg',
        duration: 220,
        creator: 'Chef Luigi'
        });
        console.log("Added One")
    };

    let insMany = async (req, res) => {
      await Recipe.insertMany(data, (error) => {console.log(error)});
      data.forEach(element => {
        console.log(`Insertted ${element.title}`);
      });
      
    }
  
    let = updateRecipe = async (req, res) => {
      await Recipe.updateOne({title:'Rigatoni alla Genovese'},{duration:100})
      console.log("Updated")
    }
  
    let = deleteRecipe = async (req, res) => {
      await Recipe.deleteOne({title:'Carrot Cake'})
      console.log("Deleted")
  }

  createRecipe();
  insMany();
  updateRecipe();
  deleteRecipe();


    ///////////////////////////////////////////


  process.on('SIGINT', function() {
    mongoose.connection.close(function () {
      console.log('Disconnect Mongoose');
      process.exit(0);
    });
  });
app.listen(3000, () => console.log("http://localhost:3000"));