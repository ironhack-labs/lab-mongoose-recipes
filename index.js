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
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(self => {
        console.log(`Connected to the database: "${self.connection.name}"`);
        // Before adding any documents to the database, let's delete all previous entries
        return self.connection.dropDatabase();
    })
    .then(() => {
        // Run your code here, after you have insured that the connection was made
        console.log('successfully connected')
    })
    .catch(error => {
        console.error('Error connecting to the database', error);
    })

Recipe.create({
        title: 'Pizza',
        level: "Amateur Chef",
        ingredients: ["tomato", "mozzarella", "meal"],
        cuisine: "italian",
        dishType: "main_course",
        duration: 20,
        creator: "Hai and Simone",
    })
    .then(recipes => {
        console.log(recipes.title)
    })
    .catch(err => {
        console.log(err)
    })

Recipe.insertMany(data)

Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
    .then(recipes => {
        console.log('duration updated', recipes)
    })
    .catch(error => {
        console.log(error)
    })

Recipe.deleteOne({ title: 'Carrot Cake' })
    .then(recipes => {
        console.log('deleted', recipes)
    })
    .catch(error => {
        console.log(error)
    })