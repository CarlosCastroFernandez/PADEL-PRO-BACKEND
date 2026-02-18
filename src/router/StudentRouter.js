const express = require("express");
const { createStudent, postStudentById, getStudentById, modifyStudent, createSinceAdmin, getAllUsers, deleteStudentById } = require("../controller/StudentController");
const verifyToken = require("../middleware/verify");
const router=express.Router();

router.post("/findStudentByEmail",postStudentById)
router.post("/createStudent", createStudent)
router.post("/createStudentSinceAdmin",verifyToken, createSinceAdmin)
router.get("/getStudentByEmail/:email",verifyToken, getStudentById)
router.patch("/modifyStudentById",verifyToken, modifyStudent)
router.get("/getAllUsers",verifyToken,getAllUsers)
router.delete("/deleteById/:id",verifyToken,deleteStudentById)

module.exports=router;