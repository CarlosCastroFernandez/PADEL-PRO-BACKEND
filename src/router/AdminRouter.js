const express = require("express");
const {getAdminByEmailAndPassword,createAdmin} = require("../controller/AdminController");

const router=express.Router();

router.post("/findAdminByEmail",/*verifytoken*/getAdminByEmailAndPassword);

router.post("/createAdmin",/*verifytoken*/createAdmin);
module.exports=router;