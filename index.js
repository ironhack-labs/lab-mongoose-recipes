const mongoose = require("mongoose");
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");

// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";
mongoose.set("useFindAndModify", false);

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
  .then(() => {
    Recipe.create({ title: "Soup", level: "Amateur Chef",ingredients:['water','rice','avecrem'],cuisine:'Spanish', dishType:'main_course',image:"https://images.media-allrecipes.com/images/75131.jpg",duration:10,creator:'Gabriel Moreno'});
  })
  .then((newRecipe) => console.log("Nueva receta creada"))
  .then(() => Recipe.create(data))
  .then((recipies) => recipies.forEach((elem) => console.log(elem.title)))
  .then(() =>
    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 90 },
      { new: true }
    )
  )
  .then((updated) =>
    console.log(updated.title + `,se ha actualizado con exito`)
  )
  // Run your code here, after you have insured that the connection was made
  .then(() => Recipe.deleteOne({ title: "Carrot Cake" }))
  .then((deleted) => console.log(`Se ha eliminado con éxito la receta.`))
  .then(() => mongoose.connection.close())
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
