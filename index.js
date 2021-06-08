const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
/*
const iteration2 = Recipe.create(
  {
    title: "Good person",
    level: "Amateur Chef",
    ingredients: [
      "1/2 cup love",
      "5 tablespoons feelings",
      "1/3 cup good vibes",
      "1/4 cup willing to do good",
    ],
    cuisine: "World",
    dishType: "main_course",
    image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
    duration: 60,
    creator: "Chef Luis"
  }
);
*/
//const iteration3 = Recipe.insertMany(data);
//const iteration4 = Recipe.updateOne({title:"Rigatoni alla Genovese"}, {duration: 100});
//const iteration5 = Recipe.deleteOne({title:"Carrot Cake"});

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    //Iteration 2
    Recipe.create(
      {
        title: "Good person",
        level: "Amateur Chef",
        ingredients: [
          "1/2 cup love",
          "5 tablespoons feelings",
          "1/3 cup good vibes",
          "1/4 cup willing to do good",
        ],
        cuisine: "World",
        dishType: "main_course",
        image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
        duration: 60,
        creator: "Chef Luis"
      }
    );
    
    //Iteration 3
    Recipe.insertMany(data)
      .then(dataCreated => {
        dataCreated.forEach(recipe => console.log(recipe.title))
        //Iteration 4
        Recipe.updateOne({title:"Rigatoni alla Genovese"}, {duration: 100})
          .then(recipe => console.log("Updated ", recipe))
          .catch(error => console.log("fallo ",error));
        //Iteration 5
        Recipe.deleteOne({title:"Carrot Cake"})
          .then(recipe => console.log(`item deleted succesfully`))
          .catch(error => console.log("fallo ", error));
      })
      .catch(error => console.log("---> fail to insert data ", error));

    /*
      Promise.all([iteration2, iteration3, iteration4, iteration5])
      .then(values => {
        console.log(values)
        mongoose.connection.close()
      })
      .catch(err => console.log(err));
    */
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


  
