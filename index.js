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
  duration: 40,
  creator: "Alex Chef",
});

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  //Add new recipe
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    Recipe.create(newRecipe)
      .then(rec => console.log("New recipe added: ", rec.title))
      //Add many recipes form json here
      .then(() => {
        Recipe.insertMany(data, () => data.forEach(el => console.log("Many inserted")));
            //Update duration of Rigatoni
            // .then(() => {
              Recipe.findOneAndUpdate(
                {title: "Rigatoni alla Genovese"},{duration: 100}, console.log("Success!"))

                //Delete carrot
                .then(() => {
                  Recipe.deleteOne({title: "Carrot Cake"});
                  console.log("Carrot cake deleted ");
                  mongoose.connection.close(() => console.log("connection closed!"));
                }
                  
                ).catch((err) => console.log("Error deleting carrot cake: ", err));
            // }).catch((err) => console.log("Error updating: ", err));
      }).catch((err) => console.log("Error inserting many: ", err));
  }).catch(error => console.error('Error connecting to the database', error));

 setTimeout(() => Recipe.find(data, () => data.forEach(el => console.log(el.title, el.duration))), 2000
 );