import Recipe from "../models/Recipe.model.js";

class RecipeController {
  static createRecipe = (req) => {
    let recipe = new Recipe(req);
    return recipe

  }

  static manyRecipes = (req) => {
    return Recipe.insertMany((req))
  }

  static updateRecipe = (req) => {
    let { title, body } = req
    return Recipe.findOneAndUpdate({ title }, body, (error) => {
      if (!error) {
        console.log('success')
      } else {
        console.log(error)
      }
    })
  }

  static removeRecipe = (req) => {
    let { id } = req;
    return Recipe.deleteOne({ id })
      .then(() => {
        console.log('Success');
      }).catch((e) => {
        console.log(e)
      })
  }
}

export default RecipeController