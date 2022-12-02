import express from "express";
import Recipe from "../models/Recipe.model.js";
import User from "../models/usermodel.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
  }
});

router.get("/read/:userid", async (req, res) => {
  try {
    const { userid } = req.params;
    const user = await User.findById(userid);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

router.put("/update/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const Userupdated = await User.findByIdAndUpdate(
      userId,
      { ...req.body },
      { new: true }
    );
    return res.status(200).json(Userupdated);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const Userupdated = await User.findByIdAndDelete(userId);
    await Recipe.deleteMany({ creator: userId });
    return res.status(204).json("Usuario deletedo com sucesso");
  } catch (error) {
    console.log(error);
  }
});

export default router;
