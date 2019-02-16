const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');
const Recipe = require('./models/Recipe.js');

mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


//Reset the collection by removing all recipes
Recipe.deleteMany({})
  .then(obj => { 
    
    console.log('The number of entries deleted was', obj); 

    //Create a quesadilla recipe
    Recipe.create({

      title: 'Quesdilla',
      level: 'Easy Peasy',
      ingredients: ['tortilla','cheese'],
      cuisine: 'American',
      dishType: 'Dish',
      image: 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiLstnJrbfgAhXGg-AKHW0SDC4QjRx6BAgBEAU&url=https%3A%2F%2Fohsweetbasil.com%2Fthe-secrets-to-the-best-quesadilla-recipe%2F&psig=AOvVaw3dfwS9lcOpkzboPTMUm44I&ust=1550100591507526',
      duration: 5,
      creator: 'Jack'

    }).then((recipe) => { 
      
      console.log('The recipe was saved and its value is: ', recipe); 

      //Insert all pre-existing recipes
      Recipe.insertMany(data)
        .then(recipes => { 
          
          console.log('The recipes were saved and their values are: ', recipes); 

          //Update the duration to 100 on the 'Rigatoni all Genovese'
          Recipe.findOneAndUpdate({ title:"Rigatoni alla Genovese" }, { duration: 100 }, {rawResult: true})
            .then(recipe => { 
              console.log('The following recipe was updated: ', recipe);
              console.log('Its new duration is 100');

              //Remove the carrot cake recipe
              Recipe.findOneAndDelete({ title: 'Carrot Cake'})
                .then(removed => {
                  console.log('This recipe was removed: ', removed);

                  //Close the database connection
                  mongoose.disconnect()
                    .then(res => {
                      console.log('The database connection was closed');
                    })
                    .catch( err => { console.log('An error occurred: ', err); });
                })
                .catch(err => { console.log('An error occurred: ', err); });
            })
            .catch(err => { console.log('An error occurred: ', err); });      
        })
        .catch(err => { console.log('An error occurred: ', err); });
    })
    .catch((err) => { console.log('An error occurred: ', err) });  
  })
  .catch(err => { console.log('An error occurred', err); });








