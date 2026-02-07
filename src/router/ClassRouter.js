const express = require("express");
const {  createClass, getAllClassByTrainer, getAllClassByDate, getAllClassByStudent, getAllClassByTrainer2, getAllClass, deleteClassById, deleteStudentByClass } = require("../controller/ClassController");
const checkStudentAvailability = require("../middleware/checkMoreClass");
const verifyToken = require("../middleware/verify");

const router=express.Router();


router.post("/createClass",verifyToken, checkStudentAvailability, createClass)
router.get("/getAllAvaliable/:idTrainer",getAllClassByTrainer)
router.get("/getAllAvaliableDate/:fecha/:trainerId",getAllClassByDate)
router.get("/getAllClassByStudent/:studentId",getAllClassByStudent);
router.get("/getAllClassByTrainer/:trainerId",getAllClassByTrainer2);
router.get("/getAllClasses",getAllClass);
router.delete("/deleteClassById/:classId",deleteClassById);
router.delete("/deleteStudentByClass/:classId/:studentId",deleteStudentByClass);

module.exports=router;