const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
    .then(() => {
        console.log('Connected to Mongo!')
    }).catch(err => {
        console.error('Error connecting to mongo', err)
    });

const RecipeSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    level: {
        type: String,
        enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
    },
    ingredients: Array,
    cousine: {
        type: String,
        required: true,
    },
    dishType: {
        type: String,
        enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'],
    },
    image: {
        type: String,
        default: 'https://images.media-allrecipes.com/images/75131.jpg'
    },
    duration: {
        type: Number,
        min: 0
    },
    creator: String,
    created: {
        type: Date,
        default: Date.now
    }

})

const Recipe = mongoose.model("Recipe", RecipeSchema);

Recipe.create({
        title: "CarotCake4",
        level: "UltraPro Chef",
        ingredients: ['1/2 cup light brown sugar', '2 bananas', '2 tablespoons milk', '1 1/4 teaspoons vanilla extract', '1/2 cup flour'],
        cousine: "American",
        dishType: ['Dessert'],
        image: 'https://www.thebakingfairy.net/wp-content/uploads/2015/05/vegan_banana_bread01.png',
        duration: 50,
        creator: "Chef Fred"
    })
    .then(RecipeDoc => {
        console.log(`${RecipeDoc.title} create SUCCESS!!`);
    })
    .catch(err => {
        console.log("recipe create FAILURE!! 💩", err);
    });





Recipe.insertMany(data)
    .then(RecipeDoc => {
        RecipeDoc.forEach(element => {
            console.log(`${element.title} create list SUCCESS!!`);
        });

    })
    .catch(err => {
        console.log("recipe create FAILURE!! 💩", err);
    });



Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { $set: { duration: 100 } })
    .then()
    .catch(err => {
        console.log(err);
    })

Recipe.remove({ title: 'Carrot Cake' })
    .then()
    .catch(err => {
        console.log(err);
    })