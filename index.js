const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const uniqueRecipe = {
  title: "Arroz carreteiro",
  level: "Amateur chef",
  ingredients: ["Óleo", "Cebola", "Alho", "Carne seca", "Tomate", "Arroz", "Sal", "Água fervente"],
  cousine: "Brasileira",
  dishType: ["main course"],
  image: "https://s2.glbimg.com/j_8UEW-iAekdDipPH_REAtX0hDk=/0x0:560x319/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2020/g/L/8vAqBLSiAUJNBrIGu2pQ/design-sem-nome.jpg",
  duration: 15,
  creator: "Gaúchos",
}



async function deleteElement(food){
        await Recipe.deleteOne({title: `${food}`}).then(response => console.log(response))
}

async function changeDuration(){
  await Recipe.updateMany ({title: 'Chocolate Cake'}, {duration: 100}).then(response => console.log(response))
}

async function returnTitle() {
  const recipesTitle = await Recipes.find (
    {},
    {title: 1, _id: 0}
  )

  recipesTitle.map((element) => console.log(element.title))
}

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';



mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
   
    return Recipe.deleteMany()
  })
  .then(() => {
    const createRecipe = Recipe.create(newRecipe);
    return createdRecipe;
    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  mongoose.connection.close(() => console.log('The connection is closed'))
