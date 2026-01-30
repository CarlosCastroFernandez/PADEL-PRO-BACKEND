const express = require("express");
const {  createClass, getAllClassByTrainer, getAllClassByDate } = require("../controller/ClassController");

const router=express.Router();


router.post("/createClass",createClass)
router.get("/getAllAvaliable/:idTrainer",getAllClassByTrainer)
router.get("/getAllAvaliableDate/:fecha/:trainerId",getAllClassByDate)

module.exports=router;