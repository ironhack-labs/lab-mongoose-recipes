const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');


const recipeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: [],
  cousine: {
    type: String,
    required: true
  },
  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
  },
  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg'
  },
  duration: {
    type: Number,
    min: 0
  },
  creator: {
    type: String
  },
  created: {
    type: Date,
    default: new Date()
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);


mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    Recipe.collection.drop();
    console.log('Connected to Mongo!')
    Recipe.create({
      title: "Pizza",
      level: "UltraPro Chef",
      ingredients: ["cheese", "flour", "tomato"],
      cousine: "Italian",
      dishType: "Dish",
      image: 'https://goo.gl/images/3hTYTd',
      duration: 20,
      creator: 'Giorgio',
      created: new Date()
    })
    Recipe.insertMany(data);
    Recipe.find({}, "title")
      .then(title => {
        console.log(title)

        Recipe.updateOne({
            title: "Rigatoni alla Genovese"
          }, {
            duration: 100
          })
          .then(() => {
            console.log("succesful change");
            Recipe.remove({title:"Carrot Cake"})
            
            
            mongoose.disconnect()
          })
      });
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });



