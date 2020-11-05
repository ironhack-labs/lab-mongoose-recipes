const mongoose = require('mongoose');


// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data.json');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
    .connect(MONGODB_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(self => {
        console.log(`Connected to the database: "${self.connection.name}"`);
        // Before adding any documents to the database, let's delete all previous entries
        return self.connection.dropDatabase();
    })

//Iteration 2
.then(() => {
    return Recipe.create({
            title: 'tiramisu',
            level: 'Easy Peasy',
            ingredients: ['milk', 'sugar', 'eggs'],
            cuisine: 'european',
            dishType: 'dessert',
            image: 'https://assets.stickpng.com/images/5ea98d4c82f5c90004032dd1.png',
            duration: 20,
            creator: 'Alex'
        })
        .then(recipe => {
            console.log('Iteration 2', recipe.title)
        });
})

//Iteration 3
.then(() => {
    return Recipe.insertMany(data)
        .then((results) => console.log(`Iteration 3a: Saved new receipt`))
        .catch((saveErr) => console.error(`Save failed: ${saveErr}`))
        .then(response => {
            data.forEach((recipe) => {
                console.log('Iteration 3b', recipe.title);
            })
        })
})

//--Second way to do iteration 3:
// Recipe.create(data)
//     .then(data => {
//         data.forEach(title => {
//             console.log(title)

//         });



//Iteration 4
.then(() => {
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: "100" })
        .then(() => console.log("Iteration 4: Rigatoni alla Genovese is updated"))
        .catch((saveErr) => console.error(`Save failed: ${saveErr}`))
})


//iteration 5
.then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" })
        .then(() => console.log("Iteration 5: Carrot Cake is deleted"))
        .catch((saveErr) => console.error(`Save failed: ${saveErr}`))
})


//iteration 6
.then(() => {
    return mongoose.connection.close(() => {
        console.log("yea, it's closed.")
    })
})


.catch(error => {
    console.error('Error connecting to the database', error);
});