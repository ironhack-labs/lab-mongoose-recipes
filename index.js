const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    
    Recipe.create({
      title: 'Pão de queijo',
      level: 'Easy Peasy',
      ingredients: [ 'leite', 'polvilho doce', 'ovos', 'oleo', 'queijo', 'sal' ],
      cuisine: 'Brasileira',
      dishType: 'breakfast',
      image: 'https://octoshop.sfo2.digitaloceanspaces.com/lojas/eat/uploads_produto/pao-de-queijojpeg-62011aa6d5fb8.jpeg',
      duration: 2,
      creator: 'Ana Maria',
      created:'',
    })

    .then((recipe) => console.log("Receita inserida no DB com sucesso", recipe))
    .catch((error) => console.log("Erro ao inserir receita no DB!", error))

    Recipe.insertMany(data)
      .then(data => console.log("Receitas inseridas no DB com sucesso", data))
      .catch(error => console.log("Erro ao inserir as receitas no DB!", error))


      Recipe.findOneAndUpdate({ title:"Rigatoni alla Genovese" },{ duration:100 },{ new:true })
      .then(recipe => console.log("Receita atualizada com sucesso", recipe))
      .catch(error=> console.log("Error ao atualizada a receita", error))



      Recipe.deleteOne({title:"Carrot Cake"})
      .then(recipe=>console.log("Carrot cake removido com sucesso", recipe))
      .catch(error => console.log("Erro ao remover o carrot cake", error))

  })
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
