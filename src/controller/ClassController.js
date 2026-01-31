const  mongo  = require("mongoose");
const classModel = require("../model/ClassModel");

const createClass = async (req, res) => {
  try {
    const { date, trainer, students } = req.body;
    console.log(date);
    const checkClass = await classModel.findOne({
      date: date,
      trainer: trainer,
    });
    let newStudents = [];
    if (checkClass !== null) {
      newStudents = students.filter((s) => !checkClass.students.includes(s));
      if (newStudents.length > 0) {
        checkClass.students.push(...newStudents);
        await checkClass.save();
        console.log("SUBIDO EN EL ARRAY");
      }
    } else if (checkClass === null) {
      const newClass = await classModel.create({
        date,
        trainer,
        students,
      });
      console.log("Se crea clase nueva");
    }

    return res.status(200).json({ status: "SUCCESS", data: "EXITOSO" });
  } catch (e) {
    return res.status(500).json({ message: e, status: "ERROR" });
  }
};
const getAllClassByTrainer = async (req, res) => {
  try {
    const { idTrainer } = req.params;
    const fechaHoy = new Date();
    fechaHoy.setHours(0, 0, 0, 0);
    const listaResult = [];
    const listaFechas = await classModel.find({ trainer: idTrainer });
    console.log(listaFechas);
    const listaFechasByDay = listaFechas.filter((clase) => {
      const claseDate = new Date(clase.date);
      claseDate.setHours(0, 0, 0, 0);
      return claseDate >= fechaHoy;
    });

    console.log(listaFechasByDay);

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
    console.log(clases);
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
      return res.status(400).json({ status: "ERROR", message: "studentId no válido" });
    }

    const studentObjectId = new mongo.Types.ObjectId(studentId);
    console.log("HOLAA "+studentObjectId)
    const classByAlumno = await classModel
      .find({ students: studentObjectId })
      .populate("trainer")  

    return res.status(200).json({
      status: "SUCCESS",
      data: classByAlumno
    });
  } catch (e) {
    return res.status(500).json({ status: "ERROR", message: e.message || e });
  }
};
const getAllClassByTrainer2 = async (req, res) => {
  const { trainerId } = req.params;

  try {
    if (!mongo.Types.ObjectId.isValid(trainerId)) {
      return res.status(400).json({ status: "ERROR", message: "studentId no válido" });
    }

    const trainerObjectId = new mongo.Types.ObjectId(trainerId);
    console.log("HOLAA "+trainerObjectId)
    const classByTrainer = await classModel
      .find({ trainer: trainerObjectId })
      .populate("students")
      .populate("trainer")

    return res.status(200).json({
      status: "SUCCESS",
      data: classByTrainer
    });
  } catch (e) {
    return res.status(500).json({ status: "ERROR", message: e.message || e });
  }
};
module.exports = { createClass, getAllClassByTrainer, getAllClassByDate, getAllClassByStudent, getAllClassByTrainer2 };
