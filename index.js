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
    .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch(err => console.error('Error connecting to mongo', err));


 Recipe.create({ title: 'Red Chicken', 
                 level:"Easy Peasy", 
                 ingredients: ["salt","pepper"],
                 cuisine:"Oriental",
                 dishType:"Dish",
                 image:"Hello",
                 creator:"Aris",}, function (err, user) {
   if (err) {  
       console.log('An error happened:', err);
   } else {
       console.log('The recipe is saved and its title is: ', user.title);
   }
 });

//Iteration 3
Recipe.insertMany(data) 
    .then((arr) => {
        for(var i =0;i<arr.length;i++){
          console.log(arr[i].title)
        }})
    .catch((error) =>{
          console.log(error);
      })

//Iteration 4
Recipe
    .findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
    .then((recipe)=> {
        console.log("recipe was changed");
    })
    .catch((error)=> {
        console.log("error: ", error);
    })


    //Iteration 4
    Recipe
        .deleteOne({ name: 'Carrot Cake' })
        .then((recipe)=> {
          console.log("Carrot Cake DELETED!");
      })
      .catch((error)=> {
        console.log("error: ", error);
    })


    //Iteration 5
    mongoose.connection
          .close()
          .then((connection)=> {
            console.log("Connection closed!");
        })
        .catch((error)=> {
          console.log("error: ", error);
          process.exit(0);
      })

      
