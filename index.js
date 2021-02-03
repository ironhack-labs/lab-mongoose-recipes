const mongoose = require('mongoose');

const Recipe = require('./models/Recipe.model');
const data = require('./data');

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
    Recipe.create({ title: "Arepa", level: "Easy Peasy", ingredients: ["Harina Pan", "sal", "agua"], cuisine: "venezolana", dishType: "breakfast", image: "https://www.recetasderechupete.com/wp-content/uploads/2019/11/Tipos-de-arepa-2-768x527.jpg", duration: 30})
      .then(theNewRecipe => console.log("New recipe: ", theNewRecipe.title))

      .then(() => {
        Recipe.insertMany(data)
        .then((recipes) => {
          recipes.forEach((recipe)=> console.log("New recipe: ", recipe.title))
          Recipe.findOneAndUpdate( { title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
            .then(newDuration => {
              console.log(`Duration of ${newDuration.title} updated to`, newDuration.duration)
              .then()
            })
        })
      })
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
