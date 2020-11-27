const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");
const { schema } = require("./models/Recipe.model");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })

  .then(() => {
    //Iteration 2 - Create a recipe
   createRecipe(newRecipe);

    //Iteration 3 - Insert multiple recipes
    insertRecipe(data);


   
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

//Iteration 2 - Create a recipe
const newRecipe = {
  title: "Arroz con coco colombiano",
  level: "Amateur Chef",
  ingredients: [
    "450 gramos de arroz",
    "720 mililitros de leche de coco",
    "480 mililitros de agua",
    "240 mililitros de refresco de cola",
    "50 gramos de uvas pasas",
    "100 gramos de coco rallado",
    "3 cucharadas de azúcar",
    "2 cucharadas de aceite",
    "Sal al gusto",
  ],
  cuisine:
    "1- Vamos a empezar a preparar nuestro arroz con coco colombiano. El primer paso es poner en una cazuela la leche de coco y llevar a ebullición a fuego lento. 2- Cuando rompa a hervir, reducimos el fuego, y dejamos que se cocine removiendo todo el tiempo, hasta que el líquido se evapore y el coco coja un color similar al caramelo. Unos 40 minutos. 3- A continuación añadimos el arroz y mezclamos bien con el coco. 4-El siguiente paso es agregar el azúcar. Removemos bien y añadimos también las uvas pasas. Salamos al gusto y mezclamos de nuevo para que se integren los sabores. 5- Es el momento de incorporar tanto el agua como la bebida de cola. Mantenemos al fuego hasta que se evapore la mitad del líquido. Nos llevará unos 10 minutos. 6- Después tapamos la cazuela y dejamos que el arroz se cocine a fuego lento unos 15 minutos, o hasta que esté hecho. 7- Solo nos queda servir y disfrutar de nuestro arroz al coco recién hecho. Nos encantará.",
  dishType: " breakfast",
  image:
    "https://www.deliciosi.com/images/800/860/arroz-con-coco-del-caribe-665.webp",
  duration: 90,
  creator: "deliciosi.com",
};

async function createRecipe(recipe) {
  const newRecipe = await Recipe.create(recipe);
  console.log("recipe", newRecipe);
}

//Iteration 3 - Insert multiple recipes
async function insertRecipe(recipe) {
  const data = await Recipe.insertMany(recipe);
  console.log("recipe", data);
}

//Iteration 4 - Update recipe

async function findOneRecipe(recipe) {
  const data = await Recipe.findByIdAndUpdate(recipe,{duration: 100});
  console.log("recipe", data);
}

