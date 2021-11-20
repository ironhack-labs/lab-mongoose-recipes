const Recipe = require("./../models/Recipe.model")

//Obtener todos los datos de las recetas para allRecipes.hbs
const getRecipes = async(req, res) =>{
    const recipe = await Recipe.find({})
    res.render("allRecipes", {
        recipe //si recipe: recipe puedo solo usar una "Key-propiedad: valor" recipe (esto es de la constante que trae todos los animes de la base de datos)
    })
}

//Funcion para modifcar un dato en BD
const putRecipes = async(req,res) =>{
    const {id} = req.params   // Destruccturacion de objetos (parametros de la url)
    // console.log(id)              //Postman ayuda a ver si estas funciones sirven
    // const { duration } = req.body  //(datos del formulario body-parser)

    //                         // id que estamos buscando
    // await Recipe.findByIdAndUpdate(id, {duration}, {new:true})  // Documentacion de Mongoos - busca un id y lo modifica //que propiedades vas a
    // res.redirect("/todas-recetas") //Muestrame de nuevo todos los animes cuando ya actulizas
}

                          // 👇  putRecipes
module.exports = { getRecipes  }