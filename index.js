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
    Recipe.create({
      title: "Vietnamese Stir-Fried Mixed Vegetables",
      level: "UltraPro Chef",
      ingredients: [
        "1/2 cup broccoli",
        "1/2 cup cauliflower",
        "1/2 cup green beans",
        "1/2 cup baby corn",
        "1/2 cup carrots",
        "1/2 cup red peppers/capsicums",
        "A few slices of zucchini",
        "4 to 6 mushrooms (button or shiitake are recommended)",
        "2 finely chopped cloves of garlic",
        "2 tablespoons​ fish sauce",
        "2 tablespoons oil",
        "1 tablespoon rice wine",
        "1/2 teaspoon white ground pepper",
        "Salt to taste"
      ],
      cuisine: "Vietnamese",
      dishType: "main_course",
      image: "https://www.thespruceeats.com/thmb/CJ4BW8c1qgvvpChKRSOoSperbwI=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/steaming-mixed-vegetables-in-the-wok--asian-style-cooking-588595864-5ad915cb3128340036a51d63.jpg",
      duration: 17,
      creator: "Chef Micko"
    }),
      Recipe.insertMany(data).then((e) => {
        e.forEach(rec => console.log(rec.title));
        const findCommand = Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 },
          { new: true },
        ).then(console.log("Updated duration of Rigatoni alla Genovese"));
        const deleteCommand = Recipe.deleteOne(
          { title: "Carrot Cake" }
        ).then(console.log("Deleted Carrot Cake"));
        Promise.all([findCommand, deleteCommand])
          .then(() => {
            console.log("Updated, Closing Data Base");
            mongoose.connection.close();
          })
      })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
