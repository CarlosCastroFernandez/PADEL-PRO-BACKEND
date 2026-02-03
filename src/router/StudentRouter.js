const express = require("express");
const { createStudent, postStudentById, getStudentById, modifyStudent } = require("../controller/StudentController");
const router=express.Router();

router.post("/findStudentByEmail",/*verifytoken*/postStudentById)
router.post("/createStudent",createStudent)
router.get("/getStudentByEmail/:email",getStudentById)
router.post("/modifyStudentById",modifyStudent)

module.exports=router;