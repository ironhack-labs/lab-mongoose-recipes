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
    .then(async() => {
        // Run your code here, after you have insured that the connection was made
        await Recipe.create({
            title: "Pan de proteina",
            level: "Easy Peasy",
            ingredients: ["Proteina en polvo", "Huevo", "Polvo Royal", "Platano"],
            cuisine: "Fit",
            dishType: "dessert",
            image: "https://i.pinimg.com/736x/6c/c7/98/6cc7985973020a4e5e91bbdad89c40f2.jpg",
            duration: 5,
            creator: "FitMan",
        });
        await Recipe.insertMany(data);
        await Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 });
        await Recipe.deleteOne({ title: "Carrot Cake" });
    })
    .then(disconnect)
    .catch(error => {
        console.error('Error connecting to the database', error);
    });

function disconnect() {
    mongoose.connection.close();
}