const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
    .then(() => {
        console.log('Connected to Mongo!')
    }).catch(err => {
        console.error('Error connecting to mongo', err)
    });

const recipeSchema = new Schema({
    title: { type: String, required: true, unique: true },
    level: { type: String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"] },
    ingredients: { type: Array },
    cousine: { type: String, required: true },
    dishType: { type: String, enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"] },
    image: { type: String, default: "https://images.media-allrecipes.com/images/75131.jpg" },
    duration: { type: Number, min: 0 },
    creator: { type: String },
    created: { type: Date, default: new Date(2018, 13, 09) }

})
const Recipe = mongoose.model("Recipe", recipeSchema);


const createRecipe = () => {

    let recipe = new Recipe({
        title: "Spaguetti a la carbonara",
        level: "Amateur",
        ingredients: ["Spaguetti", "bacon", "cebolla", "champiñones", "nata", "pimienta negra"],
        cousine: "italiana",
        dishType: "Dish",
        image: "",
        duration: 30,
        creator: "Paquito el chocolatero",
        created: new Date(2018, 18, 02)
    })

    .then((recipe) => {
        console.log('La receta se guardó correctamente, su título', recipe.title);
        return recipe.save();
    })

    .catch((err) => { console.log('Ha ocurrido un error:', err) });
    //return recipe.save();
}

// insertar recetas:
Recipe.insertMany(data)

.then((Recipe) => {
    console.log("Se han almacenado más recetas");
    let titles = Recipe.map(title => Recipe.title);
    console.log(titles);
})

.catch((error) => { console.log("Ha habido un error", error) });


// actualizar un campo

Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
    .then((Recipe) => {
        console.log("Se ha actualizado correctamente!!")
    })

.catch((error) => { console.log("Ha habido un error", error) });


//eliminar una receta:

Recipe.deleteOne({ title: "Carrot Cake" })
    .then((Recipe) => {
        console.log("Se ha eliminado correctamente!!")
    })

.catch((error) => { console.log("Ha habido un error", error) });


//cerramos la base de datos

mongoose.disconnect()
    .then(() => { console.log('ok') })

.catch((error) => { console.log("ha habido un error", error) })