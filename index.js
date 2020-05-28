const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

//create newRecipe from model
const newRecipe = new Recipe({
  title: "ALEX INVENTED THIS RECIPEzzzz",
  level: "Amateur Chef",
  ingredients: [
    "1/2 cup rice vinegar",
    "5 tablespoons honey",
    "1/3 cup soy sauce (such as Silver Swan®)",
  ],
  cuisine: "Asian",
  dishType: "main_course",
  image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
  duration: 140,
  creator: "Alex Chef",
});

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    // return self.connection.dropDatabase();
  })
  //Add new recipe
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create(newRecipe)
      .then(rec => console.log("New recipe added: ", rec.title));
  }).catch(error => console.error('Error connecting to the database', error))

      //Add many recipes form json here
  .then(() => Recipe.insertMany(data, () => data.forEach(el => console.log("Inserted: ", el.title))))
    .catch(err => console.log("Error insert many : ", err))

    //Find and update
  .then(() => Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"},{duration: 100}, console.log("Success!")))

    .catch(err => console.log("Error find and update update : ", err))
    //Delete
  .then(() => Recipe.deleteOne({title: "Carrot Cake"}))
    .catch(err => console.log("Error deleting one : ", err))
  
  .then(() => {
      mongoose.connection.close();
    });


 
    //         //Update duration of Rigatoni

    // 
    // console.log(Recipe.find({duration: 100} ));

    // //             //Delete carrot
    // 
    // console.log("Carrot cake deleted ");
    // 
                
                  

            // }).catch((err) => console.log("Error updating: ", err));
      


//  setTimeout(() => Recipe.find(data, () => data.forEach(el => console.log(el.title, el.duration))), 2000
//  );