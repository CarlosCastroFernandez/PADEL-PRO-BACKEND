const mongo = require("mongoose");
const classModel = require("../model/ClassModel");



const createClass = async (req, res) => {
  try {
    const { trainer, students } = req.body;
    const { date } = req.payload;

    const trainerObjectId = new mongo.Types.ObjectId(trainer);
    const studentObjectId = new mongo.Types.ObjectId(students[0]);

    const checkClass = await classModel.findOne({
      date,
      trainer: trainerObjectId,
    });

    if (checkClass) {
      const studentExists = checkClass.students.some((id) =>
        id.equals(studentObjectId)
      );

      if (!studentExists && checkClass.students.length < 4) {
        checkClass.students.push(studentObjectId);
        await checkClass.save();
      } else {
        return res.status(200).json({
          status: "NO EXITOSO",
          data: "NO EXITOSO",
        });
      }
    } else {
      await classModel.create({
        date,
        trainer: trainerObjectId,
        students: [studentObjectId],
      });
    }

    return res.status(200).json({
      status: "SUCCESS",
      data: "EXITOSO",
    });
  } catch (e) {
    console.error("CREATE CLASS ERROR:", e);
    return res.status(500).json({
      status: "ERROR",
      message: e.message,
    });
  }
};

const getAllClassByTrainer = async (req, res) => {
  try {
    const { idTrainer } = req.params;
    const fechaHoy = new Date();
    fechaHoy.setHours(0, 0, 0, 0);
    const listaResult = [];
    const listaFechas = await classModel.find({ trainer: idTrainer });
    const listaFechasByDay = listaFechas.filter((clase) => {
      const claseDate = new Date(clase.date);
      claseDate.setHours(0, 0, 0, 0);
      return claseDate >= fechaHoy;
    });

    const clasesAvaliable = listaFechasByDay.forEach((classe) => {
      if (classe.students.lenght >= 4) {
        listaResult.push(classe.date.getHours());
      }
    });
    return res.status(200).json({ status: "SUCCESS", data: listaResult });
  } catch (e) {
    return res.status(500).json({ message: e, status: "ERROR" });
  }
};

const getAllClassByDate = async (req, res) => {
  const { fecha, trainerId } = req.params;
  let listaHours = [];
  try {
    const clases = await classModel.find({
      trainer: trainerId,
      $expr: {
        $eq: [{ $dateToString: { format: "%Y-%m-%d", date: "$date" } }, fecha],
      },
    });

    clases.forEach((classes) => {
      if (classes.students.length >= 4) {
        const hour = classes.date.getHours();
        const minute = classes.date.getMinutes();
        listaHours.push(hour + ":" + minute.toString().padStart(2, "0"));
      }
    });

    return res.status(200).json({ status: "SUCCESS", data: listaHours });
  } catch (e) {
    return res.status(500).json({ message: e, status: "ERROR" });
  }
};
const getAllClassByStudent = async (req, res) => {
  const { studentId } = req.params;

  try {
    if (!mongo.Types.ObjectId.isValid(studentId)) {
      return res
        .status(400)
        .json({ status: "ERROR", message: "studentId no válido" });
    }

    const studentObjectId = new mongo.Types.ObjectId(studentId);
    console.log("HOLAA " + studentObjectId);
    const classByAlumno = await classModel
      .find({ students: studentObjectId })
      .populate("trainer");

    return res.status(200).json({
      status: "SUCCESS",
      data: classByAlumno,
    });
  } catch (e) {
    return res.status(500).json({ status: "ERROR", message: e.message || e });
  }
};
const getAllClassByTrainer2 = async (req, res) => {
  const { trainerId } = req.params;

  try {
    if (!mongo.Types.ObjectId.isValid(trainerId)) {
      return res
        .status(400)
        .json({ status: "ERROR", message: "studentId no válido" });
    }

    const trainerObjectId = new mongo.Types.ObjectId(trainerId);
    console.log("HOLAA " + trainerObjectId);
    const classByTrainer = await classModel
      .find({ trainer: trainerObjectId })
      .populate("students")
      .populate("trainer");

    return res.status(200).json({
      status: "SUCCESS",
      data: classByTrainer,
    });
  } catch (e) {
    return res.status(500).json({ status: "ERROR", message: e.message || e });
  }
};
const getAllClass = async (req, res) => {
  try {
    const classes = await classModel
      .find()
      .populate("students")
      .populate("trainer");

    return res.status(200).json({
      status: "SUCCESS",
      data: classes,
    });
  } catch (e) {
    return res.status(500).json({ status: "ERROR", message: e.message || e });
  }
};
const deleteClassById = async (req, res) => {
  const { classId } = req.params;
  try {
    const classes = await classModel.findByIdAndDelete(classId);

    return res.status(200).json({
      status: "SUCCESS",
      data: classes,
    });
  } catch (e) {
    return res.status(500).json({ status: "ERROR", message: e.message || e });
  }
};
const deleteStudentByClass = async (req, res) => {
  try {
    const { classId, studentId } = req.params;
    console.log(classId)
    const classe = await classModel.findById(classId);
    if (!classe) {
      return res
        .status(500)
        .json({ status: "ERROR", message: "La clase no existe" });
    } else {
      classe.students = classe.students.filter(
        (element) => element._id.toString() !== studentId,
      );
      await classe.save();
      return res.status(200).json({
        status: "SUCCESS",
        data: classe,
      });
    }
  } catch (e) {}
};
module.exports = {
  createClass,
  getAllClassByTrainer,
  getAllClassByDate,
  getAllClassByStudent,
  getAllClassByTrainer2,
  getAllClass,
  deleteClassById,
  deleteStudentByClass
};
