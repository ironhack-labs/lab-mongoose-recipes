const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    const recipeNew = new Recipe({
      title: "Bittersweet Cake",
      level: "UltraPro Chef",
      ingredients: [
        "200g / 8oz dark chocolate",
        "125g / 5oz butter",
        "3 tbsp golden syrup",
        "200g / 8oz digestive biscuits",
        "100g / 4oz mini marshmallows",
        "Raisins / cranberries / other niceities - optional",
      ],
      cuisine: "American",
      dishType: "breakfast",
      image:
        "https://www.gourmandize.co.uk/media/rocky-road-3-bmp_crop.jpg/rh/recipe-for-disaster.jpg",
      duration: 60,
      creator: "Chef  JJelley",
    });
    console.log(recipeNew);
    // // o save devolve o que  foi colocado no banco de dados, ou seja, salve, e me devolve "ele mesmo", checando se esta tudo certo.
    recipeNew
      .save()
      .then((newRecipeFromDB) => {
        console.log(
          `A Receita foi salva no Database com sucesso, com o nome de: ${newRecipeFromDB.name}`
        );
      })

      .then(() => {
        return Recipe.insertMany(data);
      })

      .then(() => {
        return Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 },
          { new: true }
        );
      })

      .then(() => {
        return Recipe.deleteOne({ title: "Carrot Cake" });
      })

      .catch((error) => {
        console.error("Error connecting to the database", error);
      })
      .catch((error) => console.log("ERROR >>>", error));
  });

// .finally(() => Recipe.close());
