const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const newRecipe = new Recipe({
  title: "Homemade Natillas",
  level: "Amateur Chef",
  ingredients: [
    "1 liter of milk",
    "6 egg's yolk",
    "2 soup spoon of maizena",
    "1 cinnamon branch"
  ],
  cuisine: "Spanish",
  dishType: "dessert",
  image: "https://canalcocina.es/medias/publicuploads/2017/05/20/125983/107608331259205297e457d9.57037758.jpg",
  duration: 30,
  creator: "La abuela Paqui"
});

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

    Recipe.create(newRecipe)
      .then(data => console.log('Recipe successfully created! New recipe title:', data.title)).then(() => {
        Recipe.insertMany(data)
          .then(data =>
            data.forEach(recipe => console.log('Recipe successfully created! New recipe title:', recipe.title))).then(() => {
            Recipe.findOneAndUpdate({
                title: "Rigatoni alla Genovese"
              }, {
                duration: 100
              }, {
                new: true
              })
              .then(doc => console.log(`Recipe ${doc.title} successfully modified! New duration:`, doc.duration)).then(() => {
                Recipe.deleteOne({
                    title: "Carrot Cake"
                  })
                  .then(doc => {
                    console.log('Recipes successfully deleted:', doc.deletedCount);
                    mongoose.connection.close();
                  })
                  .catch(err => console.log('Error while deleting the Recipe', err));
              })
              .catch(err => console.log('Error while updating the Recipe', err));
          })
          .catch(err => console.log('Error while creating the Recipes'));
      })
      .catch(err => console.log('Error while creating the Recipe'));
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });