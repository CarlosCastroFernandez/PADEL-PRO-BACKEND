const classModel = require("../model/ClassModel"); // importa tu modelo de clases

const checkStudentAvailability = async (req, res, next) => {
  try {
    const { date, students } = req.body;

    if (!date || !students || students.length === 0) {
      return res.status(400).json({ status: "ERROR", message: "Faltan datos" });
    }
    let horaUTC;
    if (!date.includes("T")) {
      const arrayHours = date.split("-");
      arrayHours[1] = arrayHours[1].includes("0")
        ? arrayHours[1].replace("0", "")
        : arrayHours[1];
      arrayHours[3] = arrayHours[3].replace(":00", "");
      console.log(arrayHours);
      horaUTC = new Date(
        Date.UTC(
          Number(arrayHours[0]),
          Number(arrayHours[1] - 1),
          Number(arrayHours[2]),
          Number(arrayHours[3]),
          0,
        ),
      );
      horaUTC.toISOString();
    } else {
      horaUTC = new Date(date).toISOString();
    }
 const studentId = students[0]; 

    // Recorremos todos los estudiantes que intentan agregarse

      // Buscamos si existe alguna clase para este estudiante a la misma fecha y hora
         const conflictClass = await classModel.findOne({
      date: horaUTC,
      students: studentId,
    });
      if (conflictClass) {
        return res.status(400).json({
          status: "ERROR",
          data: `NO EXITOSO`,
        });
      }
    
      req.payload={
        date:horaUTC
      }
    // Si todo está bien, seguimos con el siguiente middleware / controlador
    next();
  } catch (error) {
   // console.error(error);
    return res
      .status(500)
      .json({
        status: "ERROR",
        message: "Error al comprobar disponibilidad del estudiante",
      });
  }
};

module.exports = checkStudentAvailability;
