const mongoose = require('mongoose');
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express()

//CADENEROS


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
        // Run your code here, after you have insured that the connection was made
    })
    .catch(error => {
        console.error('Error connecting to the database', error);
    });


///RUTAS

app.get('/receta', async() => {
    let info = {
        "title": "recetaPrueba",
        "level": "Amateur Chef",
        "ingredients": [
            "1/2 cup rice vinegar",
            "5 tablespoons honey",
            "1/3 cup soy sauce (such as Silver Swan®)",
            "1/4 cup Asian (toasted) sesame oil",
            "3 tablespoons Asian chili garlic sauce",
            "3 tablespoons minced garlic",
            "salt to taste",
            "8 skinless, boneless chicken thighs"
        ]
    }
    let recipe = await Recipe.create(info)
    console.log(recipe)
})

app.get('/multiple', async() => {
    let recetas = await Recipe.insertMany(data)
    recetas.map((element) => {
        console.log(element.title)
    })
})

/// ITERACION 4

app.get("/cuatro", async() => {
        let cinco = await Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
        console.log("Cambiada", cinco)
    })
    //////DUDAAAAA MARCA NULL :(


///BORRAR

app.get("/borrar", () => {
    Recipe.deleteOne({ name: "Carrot Cake" }).then((message) => {
            console.log(message)
        })
        .then(() => {
            const apagar = mongoose.connection.close();
            return apagar;
        })
        .catch((error) => {
            console.error("Error connecting to the database", error);
        });
})





//LEVANTAMIENTO


app.listen(3000, () => {
    console.log("Corriendo servidor")
})