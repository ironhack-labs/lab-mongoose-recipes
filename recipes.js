const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

const Recipe = mongoose.model("recipes",
  new Schema({
        title: {
            type: String,
            required: true,
            unique: true
        },
        level: {
            type: String,
            enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
        },
        ingredients: {
            type: Array,
        },
        cuisine: {
            type: String,
            required: true
        },
        dishType: {
            type: String,
            enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']
        },
        image: {
            type: String,
            default: "https://images.media-allrecipes.com/images/75131.jpg"
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
            default: Date.now
        }
    }
))

var newRecipe = {
        title: 'Thai peanut chicken ramen',
        level: 'Amateur Chef',
        ingredients: ['Chicken', 'Coconut milk', 'soy sauce', 'fish sauce', 'honey', 'peanut butter', 'curry paste'],
        cuisine: 'Thai',
        dishType: 'Dish',
        image: 'https://www.halfbakedharvest.com/wp-content/uploads/2018/09/20-Minute-Thai-Peanut-Chicken-Ramen-1-224x224.jpg',
        duration: 30,
        creator: 'Half baked harvest',
        created: "2018-09-26"
}
  
Recipe.create(newRecipe, (err) => {
    if(err) console.log("Could not create new recipe")
    else console.log("instance added")
})

Recipe.insertMany(data, (err) => {
    if(err) console.log("Could not add the data")
    else console.log(Recipe.title)
})

Recipe.findOne({ title: 'Rigatoni alla Genovese' }, (err, doc) => {
    if(err) console.log("Could not update the recipe")
    else {
        doc.duration = 100
        doc.save()
        console.log("You succesfully updated the recipe")
    }
})

Recipe.findOne({ title: 'Carrot Cake' }).remove((err) => {
    if(err) console.log("Could not remove the Carrot Cake recipe")
    else console.log("You succesfully removed the Carrot Cake recipe")
})

mongoose.connection.close()