const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

let recipeSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    level: {
        type: String,
        enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
    },
    ingredients: Array,
    cousine: {
        type: String,
        required: true
    },
    dishType: {
        type: String,
        enum: ['Breakfast','Dish','Snack','Drink','Dessert','Other']
    },
    image: {
        type: String,
        'default': ' https://images.media-allrecipes.com/images/75131.jpg'
    },
    duration: {
        type: Number,
        min: 0
    },
    creator: String,
    created: {
        type: Date,
        'default': new Date()
    }
});

let Recipe = mongoose.model("Recipe", recipeSchema);
let options = {
    title: "Apple pie",
    level: "Easy Peasy",
    ingredients: ["Apples", "Sugar", "Dough"],
    cousine: "French",
    dishType: "Dessert",
    image: "https://pbs.twimg.com/media/B6651EkCcAAfrvu.jpg",
    duration: 30,
    creator: "Kiryl Bartashevich"
};

let opt = [
    { title: "Rigatoni alla Genovese" },
    { duration: 100 }
];

let delOpt = {
  title: "Carrot Cake"
};

async function createRecipe(options) {
    try {
        let recipeStored = await Recipe.create(options);

        if(recipeStored) {
            console.log(recipeStored.title);
        }

    } catch(err) {
        throw new Error(err);
    }

}

async function createManyRecipe(recArr) {
    try {
        let recipeArr = await Recipe.insertMany(recArr);

        if(recipeArr) {

            for(let rec of recipeArr) {
                console.log(rec.title);
            }
        }

    } catch(err) {
        throw new Error(err);
    }

}

async function updateRecipe(opt) {
    try {
        let recipeUpdated = await Recipe.updateOne(...opt);

        if(recipeUpdated) {
            console.log('Product was changed!');
        }

    } catch(err) {
        throw new Error(err);
    }

}

async function deleteRecipe(opt) {
    try {
        let recipeDeleted = await Recipe.deleteOne(opt);

        if(recipeDeleted) {
            console.log('Product was deleted!');
        }

    } catch(err) {
        throw new Error(err);
    }

}

async function doAllActions() {
    await createManyRecipe(data);

    Promise.all([
        createRecipe(options),
        updateRecipe(opt),
        deleteRecipe(delOpt)]).then(() => {
        mongoose.connection.close();
        console.log("Connection was closed!");
    });

}

doAllActions();


