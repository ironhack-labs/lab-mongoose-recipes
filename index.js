const mongoose = require("mongoose");
const express = require("express");
const Recipe = require("./models/Recipe.model");

const data = require("./data");
const hbs = require("hbs");
const path = require("path");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    return Recipe.deleteMany();
  })

  .then(() => Recipe.syncIndexes())
  .then(() => {
    return Recipe.create({
      title: "Chicken Masala",
      level: "main_course",
      ingredients: ["Chicken", "Rice", "Vegetables"],
      cuisine: "Mediteranean",
      dishType: "Mediteranean",
      image: "/lab-mongoose-recipes/75131.jpeg",
      duration: 120,
      creator: "Alvaro",
      created: Date.now(),
    })
      .then((result) =>
        console.log("Se ha creado estos registros:", result.title)
      )
      .catch((err) => console.log("Se ha producido un error:", err));
  })
  .then(() => {
    return Recipe.create(data)
      .then((result) => console.log("Se ha creado estos registros:", result))
      .catch((err) => console.log("Se ha producido un error:", err));
  })

  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    )
      .then((result) =>
        console.log("Se ha actualizado estos registros:", result.title)
      )
      .catch((err) => console.log("Se ha producido un error:", err));
  })

  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" })
      .then((result) => console.log("Se ha eliminado el registro"))
      .catch((err) => console.log("Se ha producido un error:", err));
  })

  .then(() => {
    mongoose.connection.close();
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
