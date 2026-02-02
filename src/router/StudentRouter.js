const express = require("express");
const { createStudent, postStudentById, getStudentById } = require("../controller/StudentController");
const router=express.Router();

router.post("/findStudentByEmail",/*verifytoken*/postStudentById)
router.post("/createStudent",createStudent)
router.get("/getStudentByEmail/:email",getStudentById)

module.exports=router;