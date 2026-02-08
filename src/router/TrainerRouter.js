const express = require("express");
const { postTrainerByEmail, createTrainer, allTrainer } = require("../controller/TrainerController");
const verifyToken = require("../middleware/verify");

const router=express.Router();

router.post("/findTrainerByEmail",postTrainerByEmail)
router.post("/createTrainer",verifyToken,createTrainer)
router.get("/getAllTrainers",allTrainer)

module.exports=router;