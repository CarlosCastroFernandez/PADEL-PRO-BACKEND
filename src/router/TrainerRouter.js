const express = require("express");
const { postTrainerByEmail, createTrainer } = require("../controller/TrainerController");

const router=express.Router();

router.post("/findTrainerByEmail",/*verifytoken*/postTrainerByEmail)
router.post("/createTrainer",createTrainer)

module.exports=router;