const express = require("express");
const {  createClass, getAllClassByTrainer, getAllClassByDate, getAllClassByStudent, getAllClassByTrainer2, getAllClass, deleteClassById } = require("../controller/ClassController");

const router=express.Router();


router.post("/createClass",createClass)
router.get("/getAllAvaliable/:idTrainer",getAllClassByTrainer)
router.get("/getAllAvaliableDate/:fecha/:trainerId",getAllClassByDate)
router.get("/getAllClassByStudent/:studentId",getAllClassByStudent);
router.get("/getAllClassByTrainer/:trainerId",getAllClassByTrainer2);
router.get("/getAllClasses",getAllClass);
router.delete("/deleteClassById",deleteClassById);

module.exports=router;