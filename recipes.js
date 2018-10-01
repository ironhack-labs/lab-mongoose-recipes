const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const Recipe = require ('./models/Recipes');

function create() {
    Recipe.create({
        title: 'First Recipe',
        level: 'Amateur Chef',
        ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
        cousine: 'Asian',
        dishType: ['Dish'],
        image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
        duration: 40,
        creator: 'Chef LePapu'
    }).then((recipe)=>{
        console.log(`${recipe} se guardo`);
    }).catch(error=>{
        console.log(error);
    })

}

function saveAllRecipes(){
    Recipe.insertMany(data)
        .then(res=>{
            res.forEach(element=>{
                console.log(`Se guardaron : ${element.title}`);
            })


        })
        .catch(error=>{
            console.log(error);
        })
}


function updateOneRecipe(){
    Recipe.updateOne({title:'Rigatoni alla Genovese'},{duration:100})
        .then((recipe)=>{
            console.log(` se hizo un update`);
        }).catch(error=>{
        console.log(error);
    })
}

function deleteOneRecipe(){
    Recipe.remove({title:'Carrot Cake'})
        .then((recipe)=>{
            console.log(`se borro con exito el: ${recipe}`)
        })
        .catch(error=>{
            console.log(error);
        })
}

function closeConection(){
    mongoose.connection.close();
}

create();
saveAllRecipes();
updateOneRecipe();
deleteOneRecipe();
closeConection();