//1) importando Mongoose
const mongoose = require('mongoose');

//8) iportando o modelo
const Recipe = require('./models/Recipe.model');

const listRecipes = require('./data.json');

// console.log(listRecipes);
//2)Fazer a conexao com banco
const initConnection = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/model-create');
    console. log('contectado ao banco')

    

    //criando a primeira receita - so depois disso aquii é que é criado automaticamente no Compass o database, a coleçao e o documento
    const recipeTodatabase = new Recipe(listRecipes[5]);
    await recipeTodatabase.save();
    

    //criar uma nova de outro jeito mais curto
    const recipeTodatabase2 = await Recipe.create(listRecipes[6]);
    console.log(recipeTodatabase2);

    //criar varias receitas ao mesmo tempo - nao deu certo. Ver como fazer
    // const recipesTodatabase = await Recipe.createCollection(listRecipes[2], listRecipes[3]);
    // console.log(recipesTodatabase)

    //procurando todas as receita
    const recipiesFromDatabase = await Recipe.find();
    console.log(recipiesFromDatabase)

    //editando uma receita (busquei por titulo e alterei o titulo)
    const upDateARecipe = await Recipe.updateOne({title:"Asian Glazed Chicken Thighs"}, {title: "Asian"});
    
    // //deletando uma receita - nao deu certo - ver como fazer
    // const deleteARecipe = await Recipe.deleteMany({title: "Orange and Milk-Braised Pork Carnita" });

    //deletando uma receita por ID
    const deleteById = await Recipe.deleteOne({_id:'617d6e634fc7eb5eacf2f86f'});

  } catch (error) {
    console.log('erro ao conectar', error)
  }
};


//3) Invocando a funão para conexao com banco
initConnection();


// Import of the model Recipe from './models/Recipe.model.js'
// const Recipe = require('./models/Recipe.model');
// // Import of the data from './data.json'
// const data = require('./data');

// const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// // Connection to the database "recipe-app"
// mongoose
//   .connect(MONGODB_URI, {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(self => {
//     console.log(`Connected to the database: "${self.connection.name}"`);
//     // Before adding any recipes to the database, let's remove all existing ones
//     return Recipe.deleteMany()
//   })
//   .then(() => {
//     // Run your code here, after you have insured that the connection was made
//   })
//   .catch(error => {
//     console.error('Error connecting to the database', error);
//   });
