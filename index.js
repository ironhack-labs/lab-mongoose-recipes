const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

mongoose.set('useFindAndModify', false);


// Connection to the database "recipe-app"
const dbChanges = 
  mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
      })
  .then( () => {
    //Iteration 2 - Create a recipe
    Recipe
      .create({
        title: "Whiskey Sour",
        level: "Amateur Chef",
        ingredients: [
          "2 parts bourbon",
          "1 part lemon juice",
          "½ part sugar syrup",
          "½ part egg white",
          "Cubed ice",
          "To garnish: 1 cherry and an orange slice",
        ],
        cuisine: "World",
        dishType: 'drink',
        image: "https://images.unsplash.com/photo-1541546006121-5c3bc5e8c7b9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1947&q=80",
        duration: 5,
        creator: "Mr.Bulleit"
      })
      .then(recipe => {
        console.log("You're recipe got added", recipe);
      })
      .catch(error => {
        console.log("Error you're recipe did not got added", error);
      })
    
    })
  

    //Iteration 3 - insert multiple recipes + 4 - update one recipe

  .then( () => {
    Recipe
    .insertMany(data)
     .then((inputData) => {
      return Recipe.find()
        .select('title')
        .then((theResponse) => {
           console.log(`These are the recipes that got added, ${theResponse}`)
        })
       .catch(error=> 
         console.log('Error while adding new recipes', error))

        .then(() => {
          Recipe
          .findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100 }, {new: true})
           .then(updateRecipe => {
              console.log(`Duration of ${updateRecipe.title} was changed`);
            })
            .catch(err => {
             console.log('Updating Duration failed',err);
         })
       })

    // Iteration 5 - remove Carrot cake 

           .then (() => {

              Recipe
               .deleteOne({title:"Carrot Cake"})
                .then(deletedData => {
                  console.log(`The Recipe was deleted:`, deletedData);
                      })
                  .catch(err => {
                    console.log('Deleting Recipe failed',err);
                      })
                        })
          })
       })

 
    // Iteration 6 close the connection - tested my first async function:)


       async function firstAsync() {
        let dbChanges = new Promise((res, rej) => {
            setTimeout(() => res("Mongoose connection is closed"), 1000)
        });
    
        // wait until the promise returns us a value
        let result = await dbChanges; 
      
        // "Mongoose connection is closed"
        console.log(result); 
        mongoose.connection.close();
        };
    
    firstAsync();
   