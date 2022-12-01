import { Schema, model } from "mongoose";

//Esquema ("schema"): o MongoDB não possuia esquemas, mas o SQL define esquemas por meio da definição de uma tabela.
//Um "esquema" no Mongoose é uma estrutura de dados de documento (define a forma de um documento).

//consultar: https://mongoosejs.com/docs/schematypes.html

//criando o Schema:
//recipeSchema é um objeto que estará instanciando a classe Schema
//o Schema receberá um objeto de parâmetro, como se fosse o 'constructor' de uma classe, e esse objeto conterá os campos que queremos guardar
const recipeSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    level: {
      type: String,
      enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
    },
    ingredients: [{ type: String }],
    cuisine: { type: String, required: true },
    dishType: {
      type: String,
      enum: [
        "breakfast",
        "main_course",
        "soup",
        "snack",
        "drink",
        "dessert",
        "other",
      ],
    },
    image: {
      type: String,
      default: "https://images.media-allrecipes.com/images/75131.jpg",
    },
    duration: { type: Number, min: 0 },
    creator: { type: String },
    created: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

//modelo da collection:
//.model(1º parâmetro: "nome do modelo"(nome do arquivo), 2º Parâmetro: o schema)
// = exportando um modelo (.model), que tem o nome "Recipe" (1º parâmetro), e segue a receita do recipeSchema (2º parâmetro)
const RecipeModel = model("Recipe", recipeSchema);

//exportar!
export default RecipeModel;
