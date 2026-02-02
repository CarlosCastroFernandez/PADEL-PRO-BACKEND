const express = require("express");
const {  createClass, getAllClassByTrainer, getAllClassByDate, getAllClassByStudent, getAllClassByTrainer2, getAllClass, deleteClassById } = require("../controller/ClassController");
const checkStudentAvailability = require("../middleware/checkMoreClass");

const router=express.Router();


router.post("/createClass",checkStudentAvailability, createClass)
router.get("/getAllAvaliable/:idTrainer",getAllClassByTrainer)
router.get("/getAllAvaliableDate/:fecha/:trainerId",getAllClassByDate)
router.get("/getAllClassByStudent/:studentId",getAllClassByStudent);
router.get("/getAllClassByTrainer/:trainerId",getAllClassByTrainer2);
router.get("/getAllClasses",getAllClass);
router.delete("/deleteClassById/:classId",deleteClassById);

module.exports=router;