const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: { type: String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"] },
  ingredients: Array,
  cuisine: { type: String, required: true },
  dishType:
  {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
  },
  image: { type: String, default: "https://images.media-allrecipes.com/images/75131.jpg" },
  duration: { type: Number, min: 0 },
  creator: String,
  created: { type: Date, default: Date.now() }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

//Create recipe
Recipe.create({
  ingredients:
    ['1 slice of bread',
      '1 tsp salted butter',
      '1 tsp marmalade'],
  title: 'Pan tostado con mermelada',
  level: 'Amateur Chef',
  cuisine: 'Global',
  dishType: 'Breakfast',
  duration: 3,
  creator: 'Dr. Cordon Bleu'
}
)
  .then(rec => console.log('The recipe is saved and its value is: ', rec))
  .catch(err => console.log("An error happened ", err));

//Insert the entire array
Recipe.insertMany(data)
  .then(rec => {
    console.log('The recipes are saved and their titles are: ', rec.map(el => el.title))
    //Update rigatoni
    Recipe.update({ title: "Rigatoni alla Genovese" }, { duration: 100 })
      .then(() => {
        console.log("Duration successfully updated.");

      })
      .catch(err => console.log("An error happened ", err));

    //Delete carrot cake
     Recipe.deleteOne({ title: "Carrot Cake" })
       .then(rec => {
         console.log(`Carrot Cake successfully removed.`);
         //Close the connection
         mongoose.connection.close();
       })
       .catch(err => console.log("An error happened ", err));

  })
  .catch(err => console.log("An error happened ", err));
