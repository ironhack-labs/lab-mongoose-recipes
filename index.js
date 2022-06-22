const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe
      //   .create({
      //     title: 'Ratatuille',
      //     level: 'UltraPro Chef',
      //     ingredients: ['vegetables', 'cheese', 'potatoes'],
      //     cuisine: 'french',
      //     dishType: 'main_course',
      //     duration: 45,
      //   })    
      .create([
        {
          title: 'Spanish Omelette',
          level: 'Easy Peasy',
          ingredients: ['eggs', 'oil', 'potatoes'],
          cuisine: 'spanish',
          dishType: 'breakfast',
          duration: 35,

        },

        {
          title: 'Lentles',
          level: 'Amateur Chef',
          ingredients: ['Lentles', 'paprika', 'carrot', 'potatoes'],
          cuisine: 'mediterranean',
          dishType: 'main_course',
          duration: 25,

        },
        {
          title: 'Moussaka',
          level: 'UltraPro Chef',
          ingredients: ['aubergine', 'cheese', 'meat', 'tomatoe'],
          cuisine: 'greek',
          dishType: 'other',
          duration: 60,

        },
        {
          title: "Rigatoni alla Genovese",
          level: "Easy Peasy",
          ingredients: [
            "2 pounds red onions, sliced salt to taste",
            "2 (16 ounce) boxes uncooked rigatoni",
            "1 tablespoon chopped fresh marjoram leaves",
            "1 pinch cayenne pepper",
            "2 tablespoons freshly grated Parmigiano-Reggiano cheese"
          ],
          cuisine: "Italian",
          dishType: "main_course",
          image: "https://images.media-allrecipes.com/userphotos/720x405/3489951.jpg",
          duration: 220,
          creator: "Chef Luigi"
        },
        {
          title: "Carrot Cake",
          level: "Amateur Chef",
          ingredients: [
            "6 cups grated carrots",
            "1 cup brown sugar",
            "1 cup raisins",
            "4 eggs",
            "1 1/2 cups white sugar",
            "1 cup vegetable oil",
            "2 teaspoons vanilla extract",
            "1 cup crushed pineapple, drained",
            "3 cups all-purpose flour",
            "1 1/2 teaspoons baking soda",
            "1 teaspoon salt",
            "4 teaspoons ground cinnamon"
          ],
          cuisine: "International",
          dishType: "dessert",
          image: "https://images.media-allrecipes.com/userphotos/720x405/3605684.jpg",
          duration: 130,
          creator: "Chef Nadia"
        },
      ])
  })

  .then(() => {
    return Recipe
      .findOneAndUpdate({ title: "Rigatoni alla Genovese", duration: 220 },
        { title: "Rigatoni alla Genovese", duration: 100 }
      )
  })

  .then(() => console.log(`Update`))

  .then(() => {
    return Recipe
      .deleteOne({ title: "Carrot Cake" })
  })
  .then(() => console.log(`Ole Ole Rigodón!`))

  .then(() => {
    mongoose.connection.close()
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
