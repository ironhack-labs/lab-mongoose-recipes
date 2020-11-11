const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { insertMany } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
mongoose.set('useFindAndModify', false);
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    Recipe 
      .create({ title: 'boloñesa', level: 'Easy Peasy', ingredients: ['pasta', 'tomato-sauce', 'carrots', 'celery', 'onion', 'olive oil', 'red wine'], cuisine: 'Italian', dishType: 'main_course', image: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/the-best-spaghetti-bolognese-7e83155.jpg?quality=90&webp=true&resize=300,272', duration: 60, creator: 'Nana', created: Date.now() })
      .then(newRecipe => console.log('La nueva receta es:', newRecipe.title))
          .then(() => {
            Recipe
              .insertMany(data)
              .then(Recipes => Recipes.forEach(e => console.log("Las recetas son:", e.title)))

                  .then(() => {
                    Recipe
                      .findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true })
                      .then(updatedDur => console.log("The duration has been modified to:", updatedDur))

                          .then(() => {
                            Recipe
                              .deleteOne({ title:'Carrot Cake' })
                              .then(() => console.log("The Recipe has been removed"))

                                    .then(() => {
                                      mongoose.connection.close()
                                      .then(() => console.log("The Database has been closed"))
                                    })
                                    .catch(error => console.error('Could not delete Recipe', error));
                          })
                          .catch(error => console.error('Could not delete Recipe', error));
                  })
                  .catch(error => console.error('Error updating DataBase', error));
          })
          .catch(error => console.error('Error inicializing new recipes', error)); 
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
