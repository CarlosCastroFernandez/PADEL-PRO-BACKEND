const express = require("express");
const {getAdminByEmailAndPassword,createAdmin} = require("../controller/AdminController");

const router=express.Router();

router.post("/findAdminByEmail",getAdminByEmailAndPassword);

router.post("/createAdmin",createAdmin);
module.exports=router;