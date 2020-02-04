require("dotenv").config();
const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));

app.set("views", "./views");
app.set("view engine", "hbs");

hbs.registerPartials("./views/partials");
console.log("+++++++++");

const PORT = 9990;

app.get("/", (req, res) => {
  res.send("server is arollin'!");
});

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));

hbs.registerPartials(path.join(__dirname, "views/partials"));

app.set("view engine", "hbs");

app.get("/", (HTTPRequest, HTTPResponse) => {
  const data = {
    text: "hiya"
  };

  HTTPResponse.render("home", data); // data has to be an object
});

app.get("/about", (req, res) => {
  const data = {
    css: ["about"],
    title: "My About Page",
    content: "A super text exaplaining why my company rocks !!!"
    // try to send a dynamic title + content to the view and display it
  };
  res.render("about", data);
});

app.listen(PORT, () => {
  console.log(`server ready to rock @ http://localhost:${PORT}`);
});
