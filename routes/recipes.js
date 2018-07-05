const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");
const data = require("../data");

//create
router.get("/new", (req,res)=>{
    Recipe.create(
        { 
            title: 'Nayelli House',
            level: 'Amateur Chef',
            ingredients: ['rice', 'green sala', 'chicken', 'tortilla', 'cheese', 'creme', 'salt to taste'],
            cousine: 'Mexican',
            dishType: ['Dish'],
            image: 'https://cocinaconalegria.com/media/zoo/images/pastelazteca_b4610a7d84a8f1c50a486f89d809d096.jpg',
            duration: 40,
            creator: 'Chef Naye'
          }
    )
    .then(recipe=>res.send("Receta creada"))
    .catch(err=>res.send(err));
});

//insert

router.get("/many",(req,res)=>{
    Recipe.insertMany(data)
    .then(answer=>{
        res.send("Se guardaron las rectas");
    })
    .catch(err=>{
        res.send("error"+err);
    })
});

//update

router.get("/update",(req,res)=>{
    Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"}, {title:"Rigatoni",duration:100})
        .then(receta=>{
            res.send("Receta modificada");
        })
        .catch(err=>{
            res.send("error"+err);
        });
});

//remove

router.get("/:id/delete/", (req,res)=>{
    Recipe.findByIdAndRemove(req.params.id)
    .then((err)=>{
        res.send("Borré la receta: "+ req.params.id);
    });
});

module.exports = router;