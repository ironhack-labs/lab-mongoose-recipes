const express = require("express");
const hbs = require("hbs");
const morgan = require("morgan");
const Recipe = require("./models/Recipe.model");

const app = express();
app.use(morgan("dev"));





app.listen(3000, () => console.log("App listening on port 3000!"));