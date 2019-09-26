const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log("Connected");
    Recipe.create({
      title: "Joelho de Porco",
      level: "Easy Peasy",
      ingredients: ["Porco", "Joelho", "Agua", "Feijao", "Amil", "Cebola"],
      cuisine: "Alema",
      dishType: "Dish",
      duration: 120,
      creator: "Marco"
    })
    .then(recipe => console.log(recipe.title))
    .catch(err => console.log(err))
    Recipe.insertMany(data)
      .then(recipes => {
        recipes.forEach( (recipe) => console.log(recipe.title))
        Recipe.updateOne( {title: "Rigatoni alla Genovese"}, {duration: 100})
        .then((recipe) => {
            console.log("Update realizado com sucesso!!")
            Recipe.deleteOne( {title: "Carrot Cake"})
            .then((retorno) => {
              console.log("Registro deletado com sucesso!!")
              mongoose.connection.close()
              .then(() => console.log("Conexao encerrada com sucesso!"))
              .catch((err) => console.log("Erro ao encerrar conexao:", err))
            })
            .catch((err) => console.log("Erro ao deletar:", err))
        })
        .catch((err) => console.log("Erro no update:",err))
      })
    .catch(err => console.log("Erro na insercao:", err))
    
  
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

