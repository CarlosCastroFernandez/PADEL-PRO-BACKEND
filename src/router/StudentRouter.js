const express = require("express");
const { createStudent, postStudentById, getStudentById, modifyStudent, createSinceAdmin } = require("../controller/StudentController");
const verifyToken = require("../middleware/verify");
const router=express.Router();

router.post("/findStudentByEmail",postStudentById)
router.post("/createStudent", createStudent)
router.post("/createStudentSinceAdmin",verifyToken, createSinceAdmin)
router.get("/getStudentByEmail/:email",verifyToken, getStudentById)
router.post("/modifyStudentById",verifyToken, modifyStudent)

module.exports=router;