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
    .then(() => {
        Recipe.create({
                title: 'Guiso de lentejas vegetariano',
                level: 'Easy Peasy',
                ingredients: ['Papas', 'Zapallo', 'Zanahoria', 'Cebolla', 'Ajo', 'Morron', 'Salsa de tomate', 'Lentejas', 'Agua', 'Sal', 'Hojas de laurel', 'Pimenton dulce'],
                cuisine: 'Guisuli',
                dishType: 'main_course',
                image: `https://guisosyguisados.com/wp-content/uploads/2016/08/2.-guiso-de-lentejas-tradicional-receta-argentina-300x225.jpg`,
                duration: 60,
                creator: 'El senor de los guisos'
            })
            .then((recipe) => {
                console.log(`Receta creada: ${recipe.title}`)
            })
        Recipe.insertMany(data).then(recipe => recipe.forEach((el) => console.log(`Receta creada: ${el.title}`)))
        Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true }).then(() => console.log(`Updated`))
        Recipe.deleteOne({ title: "Carrot Cake" }).then(() => console.log(`Succesfully removed Carrot Cake`))

        // Run your code here, after you have insured that the connection was made
    })
    .catch(error => {
        console.error('Error connecting to the database', error);
    })