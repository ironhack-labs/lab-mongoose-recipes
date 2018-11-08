const mongoose = require('mongoose');
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
    //ITERATION 1
    const Schema = mongoose.Schema;
    const recipe = new Schema({
      title: { type: String },
      level: { type: String, enum: ['easy peasy', 'amateur chef', 'ultrapro chef'] },
      ingredients: { type: Array },
      cuisine: { type: String },
      dishType: { type: String, enum: ['breakfast', 'dish', 'snack', 'drink', 'dessert', 'other'] },
      image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
      duration: { type: Number, min: 0 },
      creator: { type: String },
      created: { type: Date, default: Date.now }
    });

    //ITERATION 2
    const Recipe = mongoose.model('Recipe', recipe)
    // Recipe.create(newRecipe)

    //ITERATION 3
    Recipe.insertMany(data, (err) => {
      if(err) {
        console.log('Error retrieving recipe!')
      } else {
        console.log(this.title)
      }
    })

    //ITERATION 4
    Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
      .then(console.log(this.name), 'Recipe updated')
      .catch(console.log('Error updating recipe!'));

    //ITERATION 5
    Recipe.remove({ title: 'Carrot Cake' })
      .then(console.log('Recipe deleted'))
      .catch(console.log('Something went wrong.'));

    //ITERATION 6
    //db.close() ???? async
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });




