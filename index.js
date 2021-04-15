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
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    //return self.connection.dropDatabase();
  })
  .then(() => {
    const recipe1 = {
    title: "Pizza",
    level: "Easy Peasy",
    ingredients: ["flour", "tomatoes", "mozzarella", "ham"],
    cuisine: "Italy",
    dishType: "main_course",
    image: "https://www.google.com/search?q=pizza&rlz=1C1CHBF_esES902ES902&sxsrf=ALeKk03SvldBXz-kpUyRjlOGGLe1wQ8RzQ:1618492329901&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiNv5TjqYDwAhVC6uAKHc4hBjIQ_AUoAnoECAIQBA&biw=1536&bih=722#imgrc=OHCj3BQ07nlg4M",
    duration: 20,
    creator: "Cook"
  }
  Recipe.create(recipe1)
  .then(recipe => {
    console.log(`Recipe created: ${recipe.title}`)
  })
  .catch(error => console.error(error));

    Recipe.insertMany(data)
    Recipe.find({}, {title: 1, _id:0}).pretty()
  .then(data => {
    console.log(`Recipes: ${data.length}`)
  })
  .catch(error => console.error(error));

  Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { $set: { duration: 100 } }, { new: true })
  .then(Recipe => {console.log(Recipe)})
  .catch(error => console.error(error))

  Recipe.deleteOne({ title: "Carrot Cake"})
  .then(recipe => console.log(recipe))
  .catch(error => console.error(error))

  mongoose.connection.close()
  .then( () => console.log("Connection closed"))
  .catch(error => console.error(error))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
