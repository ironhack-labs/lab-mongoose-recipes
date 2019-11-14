
const { Router } = require("express");

const {
    home,
    createRecipe,
    createMany,
    changeDuration,
    deleteRecipe
} = require("../controller");

const router = Router();

router.get("/", home);
router.get("/createRecipe",createRecipe);
router.get("/createMany", createMany);
router.get("/updateRecipe", changeDuration);
router.get("/deleteRecipe", deleteRecipe);


module.exports = router;