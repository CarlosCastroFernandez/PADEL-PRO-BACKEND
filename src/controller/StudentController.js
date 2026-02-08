const studentModel = require("../model/StudentModel");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../services/emailServices");
const generateToke = require("../utils/auth");


const createStudent = async (req, res) => {

    try {
        const { name, lastName, email, password } = req.body

        const newUser = await studentModel.create({
            name,
            lastName,
            email,
            password: await bcrypt.hash(password, 10)

        });

       //await sendEmail("bubachico@gmail.com","Welcome to PADEL-PRO!!",`<h2> Bienvenido ${name}</h2><p>Gracias por llegar a registrate</p>`)
        return res.status(200).json({status:"SUCCESS",data:newUser})

    } catch (e) {
         return res.status(500).json({message:e,status:"ERROR"})
    }


}

const postStudentById = async (req, res) => {
    try {
        
        const { email, password } = req.body;
        const user = await studentModel.findOne({email});
        if (!user){
            return res.status(200).json({message:"No hay usuario por este email",status:"ERROR"})
        } else{
            if (!(await bcrypt.compare(password,user.password))){
                return res.status(200).json({message:"Contraseña errónea",status:"ERROR"})
            }
            const payload={
                _id:user._id,
                email:user.email,

            }
            const token=generateToke(payload,false)
            const tokenRefresh=generateToke(payload,true)
            return res.status(200).json({message:"login exitoso",status:"SUCCESS",data:user,token,tokenRefresh})
        }
    } catch (e) {
        return res.status(500).json({message:e,status:"ERROR"})
    }
}
const getStudentById = async (req, res) => {
    try {
        
        const { email } = req.params;
        const user = await studentModel.findOne({email});
        if (!user){
            return res.status(200).json({message:"No hay usuario por este email",status:"ERROR"})
        } else{
            return res.status(200).json({message:"login exitoso",status:"SUCCESS",data:user})
        }
    } catch (e) {
        return res.status(500).json({message:e,status:"ERROR"})
    }
}

const modifyStudent = async (req, res) => {

    try {
        const { name, lastName, studentId } = req.body

        const newUser = await studentModel.findByIdAndUpdate(
            studentId,
            {
                name:name,
                lastName:lastName
         

        },{new:true});
        if (newUser){
        //await sendEmail("bubachico@gmail.com","Welcome to PADEL-PRO!!",`<h2> Bienvenido ${name}</h2><p>Gracias por llegar a registrate</p>`)
        return res.status(200).json({status:"SUCCESS",data:newUser})
        }else{
            return res.status(500).json({message:"No existe este id de padelero",status:"ERROR"})
        }


    } catch (e) {
         return res.status(500).json({message:e,status:"ERROR"})
    }


}


module.exports={postStudentById , createStudent,getStudentById,modifyStudent}