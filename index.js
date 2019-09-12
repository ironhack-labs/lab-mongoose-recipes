const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

let pbSandwich = {
  title: 'PB Sandwich',
  ingredient: ['bread', 'jelly', 'peanut butter'],
  cuisine: 'yes',
  dishType: 'Breakfast',
  image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Peanut-Butter-Jelly-Sandwich.png/500px-Peanut-Butter-Jelly-Sandwich.png',
  duration: 5,
  creator: 'me',
  created: 12,
  level: 'Easy Peasy',
}

let recipe = new Recipe(pbSandwich);
recipe.save() // Create a new user and return a promise
  .then(recipe => {
    console.log('The recipe was created', recipe.title)
  })
  .catch(err => {
    console.log('An error occured', err)
  });



Recipe.insertMany(data)
  .then(recipe => {
    console.log('The recipe was created', recipe)

    Recipe.findById('5d7a78efec835810e241faba')
      .then(recipe => {
        recipe.duration = 100;
        return recipe.save(); // Update the user '5a3a7ecbc6ca8b9ce68bd41b' and return a promise
      })
      .then(duration => {
        console.log('The duration was updated: ' + duration)
      })
      .catch(err => {
        console.log('An error occured:', err)
      });

    // Recipe.findByIdAndRemove("5d7a78efec835810e241fab9")
    //   .then(recipe => { console.log(recipe +' was deleted')})
    //   .catch(err => { console.log(err) });


    Recipe.deleteOne({
        title: 'Carrot Cake'
      })
      .then(recipe => {
        console.log(recipe + ' was deleted')
      })
      .catch(err => {
        console.log(err)
      });
  })
  .catch(err => {
    console.log('An error occured', err)
  });


Recipe.updateOne({
    title: "Rigatoni alla Genovese"
  }, {
    duration: 100
  })
  .then(console.log('Success!'))
  .catch(console.log('An error occured'));



Recipe.deleteMany({})
  .then(res => {
    console.log("Deleted all ", res);
  })
  .catch(err => console.error(err))


mongoose.disconnect();