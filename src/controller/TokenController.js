const studentModel = require("../model/StudentModel");
const trainerModel = require("../model/TrainerModel");
const adminModel = require("../model/AdminModel");
const generateToke = require("../utils/auth");
const newToken = async (req, res) => {
  try {
    const { status } = req.params;

    const payload = req.payload;
    console.log(payload)
    let newToken = {};
    let newPayload = {};
    switch (status) {
      case "user":
        const student = await studentModel.findById(payload._id);
        if (!student)
          return res
            .status("404")
            .json({ status: "Failed", message: "No existe Usuario" });
        newPayload = {
          _id: student._id,
          email: student.email,
        };
        newToken = generateToke(newPayload, false);
        return res.status(200).json({ status: "Success", tokenNew: newToken });
      case "trainer":
        const trainer = await trainerModel.findById(payload._id);
        if (!trainer)
          return res
            .status("404")
            .json({ status: "Failed", message: "No existe Usuario" });
        newPayload = {
          _id: trainer._id,
          email: trainer.email,
        };
        newToken = generateToke(newPayload, false);
        return res.status(200).json({ status: "Success", tokenNew: newToken });

      case "admin":
        const admin = await adminModel.findById(payload._id);
        if (!admin)
          return res
            .status("404")
            .send({ status: "Failed", message: "No existe Usuario" });
        newPayload = {
          _id: admin._id,
          email: admin.email,
        };
        newToken = generateToke(newPayload, false);
        return res.status(200).send({ status: "Success", tokenNew: newToken });
    }
  } catch (e) {
    return res.status(500).send({ status: "Failed", message: e.message });
  }
};
module.exports=newToken
