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
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    Recipe.deleteMany()
    .then(() => {
        console.log("Everything is deleted")
        Recipe.insertMany(data)
        .then(() => {
            console.log("All data are inserted")
            Recipe.find({},{title: 1, _id: 0})
            .then(recipes => {
                recipes.forEach(recipe => {
                  console.log('Recipe Title :'+ recipe.title);
                })
                Recipe.updateOne({title: 'Rigatoni alla Genovese'}, { duration: 100})
                .then(() => {
                    console.log('Successfully Updated');
                    Recipe.deleteOne({title: 'Carrot Cake'})
                    .then(() => {
                      console.log('Successfully Deleted');
                      mongoose
                        .disconnect()
                        .then(() => {
                           console.log('Connections closed');
                        })
                        .catch(err => console.error('Error in disconnect:', err));
                    }) 
                    .catch(err => console.error('Error in deleteOne:', err));
                })
                .catch(err => console.error('Error in updateOne :', err));
            })
            .catch(err => console.error('Error in find:', err));
        })
        .catch(err => console.error('Error in insertMany:', err));
    })
    .catch(err => console.error('Error in deleteMany:', err));
  })
  .catch(err => console.error('Error in connection:', err));





