const express = require("express");
const { postTrainerByEmail, createTrainer, allTrainer } = require("../controller/TrainerController");

const router=express.Router();

router.post("/findTrainerByEmail",/*verifytoken*/postTrainerByEmail)
router.post("/createTrainer",createTrainer)
router.get("/getAllTrainers",allTrainer)

module.exports=router;