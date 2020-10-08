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
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
   /* THIS IS ITERATION 2!!!!!!!!!
    Recipe.create( data[0] )
      .then((recipe) => {
        console.log(recipe.title)

      })
      .catch(()=> {
        console.log()
      })
      */

     Recipe.insertMany(data)
        .then((recipes) => {
          //console.log(recipes)
          for(let recipe in recipes){
            console.log(recipes[recipe].title)
          }

          let updatedPromise = Recipe.updateOne({title: "Rigatoni alla Genovese"}, {$set: {duration: 100}})

            updatedPromise.then(() => {
                console.log('Updated yo!')
            })
            .catch((err) => {
              console.log(err)
            })
            let deletedPromise = Recipe.deleteOne({title: 'Carrot Cake'})

              deletedPromise.then(() => {
                console.log('Deleted yo!')
            })
              .catch((err) => {
                console.log(err)
            })
          Promise.all([updatedPromise, deletedPromise])
            .then(() => {
              console.log('Connection closed!')
              mongoose.connection.close()
            }) 
            .catch((err) => {
                console.log('Throw an error: ', err)
                
            }) 
       })
        .catch((err)=> {
          console.log(err)
    })
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
