const trainerModel=require("../model/TrainerModel");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../services/emailServices");


const postTrainerByEmail = async (req, res) => {
    try {
        
        const { email, password } = req.body;
        const user = await trainerModel.findOne({email});
        if (!user){
            return res.status(200).json({message:"No hay usuario por este email",status:"ERROR"})
        } else{
            if (!(await bcrypt.compare(password,user.password))){
                return res.status(200).json({message:"Contraseña errónea",status:"ERROR"})
            }
            return res.status(200).json({message:"login exitoso",status:"SUCCESS",data:user})
        }
    } catch (e) {
        return res.status(500).json({message:e,status:"ERROR"})
    }
}

const createTrainer = async (req, res) => {

    try {
        const { name, lastName, email, password, priceByClass, experienceYears } = req.body

        const newUser = await trainerModel.create({
            name,
            lastName,
            email,
            password: await bcrypt.hash(password, 10),
            priceByClass,
            experienceYears

        });

       //await sendEmail("bubachico@gmail.com","Welcome to PADEL-PRO!!",`<h2> Bienvenido ${name}</h2><p>Gracias por llegar a registrate</p>`)
        return res.status(200).json({status:"SUCCESS",data:newUser})

    } catch (e) {
         return res.status(500).json({message:e,status:"ERROR"})
    }


}
module.exports={postTrainerByEmail , createTrainer}