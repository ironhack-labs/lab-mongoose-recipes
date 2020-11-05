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
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    //Iteration 2
      Recipe.create({
        title: "Turkey Meatball with Zucchini Noodles",
        level: "Easy Peasy",
        ingredients: ["zucchini", "garlic", "ground turkey", "lemon"],
        cuisine: "Italian",
        dishType: "main_course",
        image: "https://www.eatwell101.com/wp-content/uploads/2018/04/turkey-meatballs-recipe.jpg",
        duration: 30,
        creator: "Joanna Young",
        created: Date.now()
      }).then((n) => {
        console.log(`Added new recipe: ${n.title} ✨`)
      }).catch(e => console.log(e))
    
    //Iteration 3
    Recipe.insertMany(data).then((recipesArray => {
      recipesArray.forEach(recipe => {
        console.log(`The following recipe was inserted: ${recipe.title} ✅`)
      })
    }))
    
    //NO VEO LOS CAMBIOS DE 4 Y 5 :( SALE EL CONSOLE.LOG PERO NO VEO NADA DIFERENTE EN COMPASS)

    //Iteration 4
    Recipe.findOneAndUpdate(
      {title: "Rigatoni alla Genovese"}, 
      {duration: 100},
      {new: true}
    ).then((e) => {
      console.log(`Updated ${e.title} 🔄`)
    })

    //Iteration 5
    Recipe.deleteOne({title: "Carrot Cake"}).then(() => {
      console.log(`Deleted "Carrot Cake" ❌`)
    })

    //Iteration 6
    // console.log("Disconnecting from database.")
    // mongoose.disconnect()

    
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

 
