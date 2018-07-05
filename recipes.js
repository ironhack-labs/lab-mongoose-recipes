const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');


mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    mongoose.connection.db.dropDatabase();
    console.log('Connected to Mongo!');

    const recipeSchema = new Schema({
      title: { type: String, required: true, unique: true },
      level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
      ingredients: { type: Array },
      cousine: { type: String, required: true },
      dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] },
      image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
      duration: { type: Number, min: 0 },
      creator: { type: String },
      created: { type: Date, default: Date.now }
    });

    const Recipe = mongoose.model('Recipe', recipeSchema);

    Recipe.create({
      title: 'Asian',
      level: "Easy Peasy",
      ingredients: ['a', 'b'],
      cousine: 'Asian',
      dishType: 'Breakfast',
      duration: 10,
      creator: 'Paula&Minyu',
    }, function (err, recipe) {
      if (err) console.log('An error happened:', err);
      else console.log('Recipe initiated ', recipe);
    });

    Recipe.insertMany(data, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log(`recipe! SAVED.`);
        Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
          .then(() => {
            console.log('done!');
            Recipe.deleteOne({title: "Carrot Cake" })
              .then(() => {
                console.log("deleted!");
                mongoose.connection.close()
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      }
    });
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });