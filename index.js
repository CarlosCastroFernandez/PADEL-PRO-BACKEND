require("dotenv").config();
const express=require("express");
const cors=require("cors");
const connectToDataBase = require("./src/db/Connect");
const studentRouter=require("./src/router/StudentRouter");
const trainerRouter=require("./src/router/TrainerRouter");
const classRouter=require("./src/router/ClassRouter");
const adminRouter=require("./src/router/AdminRouter");
const tokenRouter=require("./src/router/TokenRouter");


connectToDataBase();

const PORT= Number (process.env.PORT || 3000);

const app=express();
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
    allowedHeaders:["Content-Type","auth-token"]
}));

app.use("/student",studentRouter)
app.use("/trainer",trainerRouter)
app.use("/class",classRouter)
app.use("/admin",adminRouter)
app.use("/token",tokenRouter)

app.listen(PORT,()=>{
    console.log("Escuchando... en el puerto "+PORT);
    
})