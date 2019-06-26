const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'


// let promiseInitial = Recipe.create({
//     title: 'Tortilla de patata',
//     level: 'Amateur Chef',
//     ingredients: ['4 huevos', '3 patatas', '1/2 ceboola'],
//     cuisine: 'Spanish',
//     dishType: 'Dish',
//     image: 'https://www.recetasderechupete.com/wp-content/uploads/2016/08/Tortilla-de-patatas-525x360.jpg',
//     duration: 45,
//     creator: 'Arguiñano'
// });

// let deleteRecipe = Recipe.deleteMany();
// let promise1 = Recipe.insertMany(data);
// let promise2 = Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true });
// let promise3 = Recipe.deleteOne({ title: 'Tortilla de patata' });

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to Mongo!');
        // return Promise.all([promiseInitial, promise1, promise2, promise3])
        //     .then(recipes => {
        //         console.log(recipes);
        //         // console.log("Todos los registros se han insertado correctamente!!" + recipes[1].title)
        //         // console.log("Cambio hecho correctamente: " + recipes[2].duration)
        //         mongoose.connection.close();
        //     })
        //     .catch(err => console.log(err))
    }).catch(err => {
        console.error('Error connecting to mongo', err);
    });

Recipe.deleteMany()
    .then(() => {
        console.log('delete');
        Recipe.create({
                title: 'Tortilla de patata',
                level: 'Amateur Chef',
                ingredients: ['4 huevos', '3 patatas', '1/2 ceboola'],
                cuisine: 'Spanish',
                dishType: 'Dish',
                image: 'https://www.recetasderechupete.com/wp-content/uploads/2016/08/Tortilla-de-patatas-525x360.jpg',
                duration: 45,
                creator: 'Arguiñano'
            })
            .then(() => {
                console.log("promise1")
                Recipe.insertMany(data)
                    .then(() => {
                        console.log("promise2")
                        Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true })
                            .then(() => {
                                console.log("promise3")
                                Recipe.deleteOne({ title: 'Carrot Cake' })
                                    .then(() => {
                                        console.log("delete Carrot Cake");
                                    });
                            });
                    });
            });
    });