const mongoose = require('mongoose');
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model'); 
// Import of the data from './data.js'
const data = require('./data.js');        

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev-02', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {  
    let allRecipes = [];
    for(let i = 0; i < data.length; i++){
      let recipe = new Recipe;
      recipe.title = data[i].title;
      recipe.level = data[i].level;
      recipe.ingredients = data[i].ingredients;
      recipe.cuisine = data[i].cuisine;
      recipe.dishType = data[i].dishType;
      recipe.duration = data[i].duration;
      recipe.creator = data[i].creator;
      recipe.created = data[i].created;
      allRecipes.push(recipe);
    }
    // Iteration 2 and 3
    // Recipe.insertMany(allRecipes, function(error, docs) {});
    return allRecipes
  })
  .then(title => {
    for(let a = 0; a < title.length; a++){
      console.log(title[a].title);
    }
    return 'Rigatoni alla Genovese';
  })
  .then(titleUpload =>{
    // Iteration 4
    const query = { title: titleUpload};
    // https://stackoverflow.com/questions/32811510/mongoose-findoneandupdate-doesnt-return-updated-document
    Recipe.findOneAndUpdate(query,  { $set: {duration: '201'}}, false, (err,doc) => {
      if (!err) 
        doc.save();
        console.log("Congratulations")
      else 
        console.log("Something wrong when updating duration!");
    });
  })
  .catch(err => console.error('Error connecting to mongo', err));


  /*

Iteración 5 - Eliminar una receta
Oh oh! El pastel de zanahoria ya no está disponible, por lo que debemos
 eliminarlo de la base de datos. Usando el método Model.deleteOne, elimine 
 esa receta de la base de datos y muestre un mensaje de éxito después de hacerlo.

Iteración 6: cierre la base de datos
Después de hacer toda la tarea, debe cerrar la base de datos. De lo contrario, 
la conexión se mantendrá abierta. Tenga cuidado con la asincronía de todos los procesos; 
¡deberías cerrarlo después de que todo esté hecho! guiño

  */