const classModel = require("../model/ClassModel"); 
const checkStudentAvailability = async (req, res, next) => {
  try {
    const { date, students } = req.body;

    if (!date || !students || students.length === 0) {
      return res.status(400).json({ status: "ERROR", message: "Faltan datos" });
    }

    let horaUTC;

    if (!date.includes("T")) {
      const arrayHours = date.split("-");
      const year = Number(arrayHours[0]);
      const month = Number(arrayHours[1]) - 1; 
      const day = Number(arrayHours[2]);
      const hour = Number(arrayHours[3].replace(":00", ""));

      horaUTC = new Date(Date.UTC(year, month, day, hour, 0));
    } else {
      horaUTC = new Date(date);
    }

    const studentId = students[0];

    const conflictClass = await classModel.findOne({
      date: horaUTC,
      students: studentId,
    });

    if (conflictClass) {
      return res.status(400).json({
        status: "ERROR",
        data: "NO EXITOSO",
      });
    }

    req.payload = { date: horaUTC };
    next();
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      message: "Error al comprobar disponibilidad del estudiante",
    });
  }
};


module.exports = checkStudentAvailability;
