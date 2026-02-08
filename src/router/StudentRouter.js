const express = require("express");
const { createStudent, postStudentById, getStudentById, modifyStudent } = require("../controller/StudentController");
const verifyToken = require("../middleware/verify");
const router=express.Router();

router.post("/findStudentByEmail",/*verifytoken*/postStudentById)
router.post("/createStudent",verifyToken, createStudent)
router.get("/getStudentByEmail/:email",verifyToken, getStudentById)
router.post("/modifyStudentById",verifyToken, modifyStudent)

module.exports=router;