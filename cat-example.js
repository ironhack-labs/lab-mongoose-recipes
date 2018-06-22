const mongoose = require("mongoose");


const Cat = require("./cat-model.js");
//connect to a database using a CONNECTION STRING
//(domain and all info about the db we are connecting to)
mongoose.connect("mongodb://localhost/cat-diet")


//const Schema = mongoose.Schema;

// const catSchema = new Schema ({
//   name: { type:String, required: true},
//   age: { type:Number, min: 0, max: 30},
//   color: { type:String},
//   vetVisits: [{ type:Date}],
//   toys: [{ type:String}],
//   owners: [{ type:Schema.Types.ObjectId}],
//   photo: {type: String, default: "https://scontent-cdg2-1.xx.fbcdn.net/v/t31.0-8/13072681_1711523482470328_3920066350691627010_o.jpg?_nc_cat=0&oh=7b8ebc4661d4a4f77d9a8e080b2eac1d&oe=5BEB9A96"},
//   countryCode: {type: String, match: /^[A-Z]{2}$/}
// });

//"Cat" is the Cat Model object
// The Cat model will allow us to work with the Cats collection
//const Cat = mongoose.model("Cat", catSchema);

//Creating new cats
//------------------------------------------------------------------------------------

//Methode 1
Cat.create({name: "Yuki", age: 8, color: "white", countryCode: "USA"})
  .then((catDoc)=>{
    console.log("Yuki creation successful", catDoc);
  })
  .catch((err)=>{
    console.log("Yuki creation failed!", err);
  })
//la méthode create vient de mongoose

//Methode 2
const janasCat = new Cat({ name: "BC", age: 16, color: "tuxedo"});
janasCat.save()
  .then((catDoc)=>{
    console.log("BC save success!", catDoc);
  })
  .catch((err)=>{
    console.log("BC save Failure!", err);
  });


  //READ
  //--------------------------------------------------------------------------------------------
//Readng cats fron the db

 //filter object inside find
Cat.find({age: {$gte: 10}})
  .then((catResults)=>{
    //"catResults" is an array that matches my queries
    catResults.forEach((oneCat) => {
      console.log(`meow ${oneCat.name} (id: ${oneCat._id}`);
    });
  })
  .catch((err)=>{
    console.log("Can't find !", err)
  });

Cat.findOne({name: "Yuki"})
  .then((catDoc)=>{
    //"catDoc" is one doc only, the first one that matches in the order of the db
    console.log(`ONE CAT -> ${catDoc.name}(id: ${catDoc._id})`);
  })
  .catch((err)=>{
    console.log("one cat FAILURE!", err)
  });

 

  //Cat.findOne({_id: "noznfzntet"})
  Cat.findById("5b2bb3556a9b500db5c9236d")
    .then((catDoc)=>{
      console.log(`Find by ID -> ${catDoc.name}(color: ${catDoc.color})`)
    })
    .catch((err)=>{
      console.log("Find by Id FAILURE!", err)
    })

//UPDATE
//--------------------------------------------------------------------------------------------
Cat.updateMany(
  {name: "Yuki", color: null},
  {color: "white"}
)
  .then((result)=>{
    console.log(`Update succesful!`, result)
  })
  .catch((err)=>{
    console.log(`Yuki update failed!`, err)
  });


Cat.updateOne(
  {name: "BC", color: null},
  {color: "tuxedo"}
)
  .then((result)=>{
    console.log(`BC updated one`, result)
  })
  .catch((err)=>{
    console.log(`BC update failed :(`)
  });


//DELETE
//--------------------------------------------------------------------------------------------
Cat.deleteOne({_id: "5b2bb2478b05825159253d8b"})
  .then((result)=>{
    console.log(`delete one success!`, result)
  })
  .catch((err)=>{
    console.log(`DeleteOne failed!`, err)
  })