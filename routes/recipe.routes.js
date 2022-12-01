//importar o express
import express from "express";

//o roteador
const recipeRoute = express.Router();

//importar o Model:
import RecipeModel from "../model/recipe.model.js";

//Iteration 2 - Create a recipe
recipeRoute.post("/create", async (req, res) => {
  const recipe = await RecipeModel.create({ ...req.body });

  return res.status(201).json(recipe.title);
});

//Iteration 3 - Insert multiple recipes -
//insertMany() -> ver na documentação que precisa receber um array!
recipeRoute.post("/create-many", async (req, res) => {
  const recipes = await RecipeModel.insertMany([...req.body]);
  return res.status(200).json(recipes);
});

//Iteration 4 - Update recipe

//findOneAndUpdate();
/* recipeRoute.put("/edit/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updateRecipe = await Recipe.findOneAndUpdate(
      { _id: id }
    );
    return res.status(200).json(updateRecipe);
  } catch (error) {
    return res.status(500).json(error);
  }
}); */

//findByIdAndUpdate()
recipeRoute.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    //findByIdAndUpdate recebe 3 parâmetros:
    //o filtro -> id
    //as modificações -> {...req.body}
    //um objeto de configuração {new: true, runValidators: true}
    //new: true → retorna o documento atualizado
    //runValidators → roda as validações definidas no schema
    const updatedRecipe = await RecipeModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    return res.status(200).json(updatedRecipe);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error.errors);
  }
});

//Iteration 5 - Remove a recipe

/* 
// deleteOne()
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleteRecipe = await Recipe.deleteOne({ _id: id });
        return res.status(200).json(deleteRecipe);
    } catch (error) {
        return res.status(500).json(error);
    }
});
*/

// findByIdAndDelete()
recipeRoute.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecipe = await RecipeModel.findByIdAndDelete(id);

    //caso o id não exista na coleção
    if (!deletedRecipe) {
      return res.status(400).json({ msg: "Recipe not found." });
    }

    return res.status(200).json(deletedRecipe);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error.errors);
  }
});

export default recipeRoute;
