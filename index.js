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
    return self.connection.dropDatabase();
  })
  //se pone aquí dentro para que no se ejecute antes de uqe se conecte
  .then(() => {

    //Iteration 2
    const recipe = new Recipe({
      title: "Orange and Milk-Braised Pork Carnitas",
      level: "UltraPro Chef",
      ingredients: [
        "3 1/2 pounds boneless pork shoulder, cut into large pieces",
        "1 tablespoon freshly ground black pepper",
        "1 tablespoon kosher salt, or more to taste",
        "1 orange, juiced and zested"
      ],
      cuisine: "American",
      dishType: "main_course",
      image: "https://images.media-allrecipes.com/userphotos/720x405/2280918.jpg",
      duration: 160,
      creator: "Chef John"
    })

    recipe.save()
      .then(recipe => {
        console.log(`Recipe: ${recipe.title} created!!`)
      })

      .catch(err => {
        console.error(err)
      })

    //Iteration 3
    Recipe.insertMany(data)
      .then(recipes => {
        recipes.forEach(recipe => {
          console.log(`recipe ${recipe.title} created`)
        })

        //Iteration 4
        Recipe.findOneAndUpdate({
            title: "Rigatoni alla Genovese"
          }, {
            duration: 100
          })
          .then(recipe => {
            if (recipe) {
              console.log(`Recipe: ${recipe.title} updated!!`)
            } else {
              console.log('recipe not found')
            }
          })
          .catch(err => {
            console.error(err)
          })

        //Iteration 5
        Recipe.deleteOne({
            title: "Carrot Cake"
          })
          .then(recipe => {
            console.log(`Recipe  deleted!!`)

            mongoose.connection.close()
          })
          .catch(err => {
            console.error(err)
          })
      })



      .catch(err => {
        console.error(err)
      })
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });