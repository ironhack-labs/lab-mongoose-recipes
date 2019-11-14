const { Router } = require("express");
//  importo cada controller por su nombre, como una propiedad del archivo
const {
  home,
  createRecipe,
  createRecipes,
  updateRecipe,
  deleteRecipe
} = require("../controllers");

const router = Router();

router.get("/", home);

router.get("/createRecipe", createRecipe);

router.get("/createRecipes", createRecipes)

router.get("/updateRecipe",updateRecipe)

router.get("/deleteRecipe",deleteRecipe)

module.exports = router;