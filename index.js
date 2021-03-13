//é melhor fazer assíncrono porque tem ganho de processamento
const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data"); //já tá importando alguns pratos que estão no ./data

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

//interaction 2 e 3 can happen in parallel
async function insertRoutines() {
  const newRecipe = {
    title: "Pasta with sauce and meat",
    level: "Easy Peasy",
    ingredients: ["Pasta", "Tomatoes", "Meat"],
    cuisine: "Italian",
    dishType: "main_course",
    duration: 20,
    creator: "Henrique Mendes",
  };

  console.time("insert routine");
  const createdRecipePromisse = await Recipe.create(newRecipe);
  const manyNewRecipesPromisse = await Recipe.insertMany(data);

  try {
    const results = await Promise.all([
      createdRecipePromisse,
      manyNewRecipesPromisse,
    ]);
    /*     console.log(`Inserted one new Recipe => ${createdRecipePromisse.title}`);
    console.log(`Finished inserting many Recipes`);
    manyNewRecipesPromisse.forEach((recipe) => console.log(recipe.title)); */
    console.timeEnd("insert routine"); //cria um cronometro e mostra quanto tempo demorou para rodar
  } catch (error) {
    throw new Error(error.message);
  }
}

//interaction 4 e 5 can happen in parallel **posso fazer depois sozinha. Ele explicou mais ou menos como fazer no vídeo
async function updateAndDeleteRoutines() {
  try {
    //interaction 4
    const updateRecipe = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { $set: { duration: 100 } }, //isso atualiza
      { new: true, useFindAndModify: false } //para entregar no console o objeto atualizado e não o antes de atualizar que está definido lá no .data
    );
    console.log(
      `$Sucessfully update recipe "${updateRecipe.title}" with duration of ${updateRecipe.duration} minutes`
    );

    //interaction 5
    await Recipe.deleteOne({ title: "Carrot Cake" });
    console.log("Recipe Carrot Cake deleted");
  } catch (error) {
    throw new Error(error.message);
  }
}

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // quando conecta no banco de dados avisa que conectou no database
    return self.connection.dropDatabase();
  })
  .then(async () => {
    // antes de rodar nosso código ele vai dropar a nossa base de dados. Então sempre que for rodar o then, vai estar com a base limpa. Isso vai fazert com que a gente consiga testar varias vezes sem ter que limpar nossa base na mão. Se não limpa a base de dados antes, vai tentar criar nosso recipe de novo e vai dar ruim porque já vai ter quela receita gravada no banco e não vai deixar gravar de novo porque marcamos como 'unique' -- mas o henrique testou e não funcionou essa propriedade. ele está deixando gravar string iguais

    try {
      //interaction 2 e 3
      await insertRoutines();

      //interaction 4 e 5
      await updateAndDeleteRoutines();

      //interaction 6
      mongoose.conecttion.close();

      //daqui pra baixo já estava no código
    } catch (error) {
      console.log(error);
    }
  })
  .catch((error) => {
    console.log("Error connecting to the database", error);
  });
