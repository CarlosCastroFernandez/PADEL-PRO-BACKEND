const express = require("express");
const verifyToken = require("../middleware/verify");
const newToken = require("../controller/TokenCOntroller");



const router=express.Router();


router.get("/newToken/:status",verifyToken,newToken)


module.exports=router;