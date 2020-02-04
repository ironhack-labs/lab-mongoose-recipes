const express = require("express");
const router = new express.Router();

router.get("/home", (req, res) => {
    res.render("test");
})

router.get("/about", (req, res) => {
    res.render("test");
})

router.get("/contact", (req, res) => {
    res.render("test");
})