const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);


// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { update } = require('./models/Recipe.model');

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
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // Iteration 2
    Recipe.create({
      title: "Guacamole Berlines",
      level: "Amateur Chef",
      ingredients: [
        "4 Avocados",
        "1 Tomato",
        "Onion",
        "Garlic",
        "Lemon juice",
        "Salt to taste",
        "Pepper to taste",
        "coriander"
      ],
      cuisine: "Mexican",
      dishType: "main_course",
      image: "https://houseofnasheats.com/wp-content/uploads/2016/07/Best-Guacamole-Recipe-12.jpg",
      duration: 15,
      creator: "Chef Habid B. Espinosa"
    })
    .then(newRecipe => console.log(`My recipe: ${newRecipe.title}`)
    )
    .catch((err)=> console.log(err));
    
    // Iteration 3 
    Recipe.insertMany(data)
    .then(newRecipe => newRecipe.forEach(recipe=>{
      console.log(recipe.title);
    }))
    .catch((err)=> console.log(err));

    // Iteration 4
    Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true})
    .then((newRecipe) => console.log(newRecipe))
    .catch((err) => console.log(err));

    // Iteration 5
    Recipe.deleteOne({titel: "Carrot Cake"})
    .then((result) => console.log(result)
    )
    .catch((err) => console.log(err));

    // Iteration 6
  //   mongoose.connection.close()
  //  .then((finish)=>{
  //    console.log('Bye Mongoose')
  //  })
  //  .catch((err) => console.log(err));

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
