const mongo = require("mongoose");

const connectToDataBase = async () => {
    try{
        const URL_MONGO=process.env.URL_MONGO;
            await mongo.connect(URL_MONGO);
            console.log("Conexion a la base de datos exitosa");
    } catch (e){
        console.log("Error al conectar "+e)
    }

}

module.exports=connectToDataBase;
