const express = require("express");
const { createStudent, postStudentById } = require("../controller/StudentController");
const router=express.Router();

router.post("/findStudentByEmail",/*verifytoken*/postStudentById)
router.post("/createStudent",createStudent)

module.exports=router;