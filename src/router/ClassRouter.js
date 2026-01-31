const express = require("express");
const {  createClass, getAllClassByTrainer, getAllClassByDate, getAllClassByStudent, getAllClassByTrainer2 } = require("../controller/ClassController");

const router=express.Router();


router.post("/createClass",createClass)
router.get("/getAllAvaliable/:idTrainer",getAllClassByTrainer)
router.get("/getAllAvaliableDate/:fecha/:trainerId",getAllClassByDate)
router.get("/getAllClassByStudent/:studentId",getAllClassByStudent);
router.get("/getAllClassByTrainer/:trainerId",getAllClassByTrainer2);

module.exports=router;