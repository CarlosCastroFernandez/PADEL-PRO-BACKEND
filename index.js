require("dotenv").config();
const express=require("express");
const cors=require("cors");
const connectToDataBase = require("./src/db/Connect");
const studentRouter=require("./src/router/StudentRouter");
const trainerRouter=require("./src/router/TrainerRouter");
const classRouter=require("./src/router/ClassRouter");


connectToDataBase();

const PORT= Number (process.env.PORT || 3000);

const app=express();
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
    allowedHeaders:["Content-Type"]
}));

app.use("/student",studentRouter)
app.use("/trainer",trainerRouter)
app.use("/class",classRouter)

app.listen(PORT,()=>{
    console.log("Escuchando... en el puerto "+PORT);
    
})