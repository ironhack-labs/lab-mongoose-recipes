const mongoose = require("mongoose");
const Recipe = require("./models/recipe.model");

require("./../config/db.config");

const recipies = [
    {
        title: "English Breakfast",
        ingredients: [ 
        "4 Salchichas",
        "8 Tomates Cherrys",
       " 300 g Champiñones",
        "6 Lonchas de Panceta o Beicon",
        "3 Rebanadas de pan de molde",
        "4 Rodajas de Morcilla",
        "400 g Frijoles cocidos",
        "2 Huevos"
        ]
        
    }
]