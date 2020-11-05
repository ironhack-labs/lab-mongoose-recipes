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
    useUnifiedTopology: true
  })
  /*.then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })*/
  .then(() => {

   /* Recipe.insertMany(data)
    .then((results) => console.log(`saved new recipes ${results}`))
    .catch(() => console.error('save Failed'));

    const omelette = {
      "title": "Spanish Omelette",
        "level": "Amateur Chef",
        "ingredients": [
          "oil",
          "3 tablespoons salt",
          "500 gr potatoes",
          "7 eggs"
        ],
        "cuisine": "Mediterranean",
        "dishType": "main_course",
        "duration": 50,
        "creator": "Chef LePliakas"
    }

      const recipe = new Recipe(omelette);

      recipe
        .save()
        .then(() => console.log('saved new recipe'))
        .catch(() => console.error('save Failed'));*/

    /*Recipe.findOneAndUpdate( { title: "Rigatoni alla Genovese" }, {$set: { duration: 100 }} )
    .then(() => console.log(`Updated!`))
    .catch(() => console.error('update Failed'));*/

    Recipe.deleteOne({title: "Carrot Cake"})
      .then(() => console.log(`Deleted!`))
      .catch(() => console.error('delete Failed'));
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  mongoose.connection.close()
  .then(() => console.log(`Connection closed!`))
  .catch(() => console.error('delete Failed'));
