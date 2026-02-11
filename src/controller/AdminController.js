const adminModel = require("../model/AdminModel");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../services/emailServices");
const generateToke = require("../utils/auth");

const getAdminByEmailAndPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await adminModel.findOne({ email });

    if (!user) {
      return res
        .status(200)
        .json({ message: "No hay usuario por este email", status: "ERROR" });
    } else {
      if (!(await bcrypt.compare(password, user.password))) {
        return res
          .status(200)
          .json({ message: "Contraseña errónea", status: "ERROR" });
      }

      const payload = {
        _id: user._id,
        email: user.email,
      };
      const token = generateToke(payload, false);
      const tokenRefresh = generateToke(payload, true);
      return res
        .status(200)
        .json({
          message: "login exitoso",
          status: "SUCCESS",
          data: user,
          token,
          tokenRefresh,
        });
    }
  } catch (e) {

    return res.status(500).json({ message: e, status: "ERROR" });
  }
};
const createAdmin = async (req, res) => {
  try {
    const { name, lastName, email, password } = req.body;

    const newUser = await adminModel.create({
      name,
      lastName,
      email,
      password: await bcrypt.hash(password, 10),
    });
    //Se deja comentado el envio del correo electrónico por si se desea descomentar para implementarlo ya que lo tenemos en las dependencias
    //await sendEmail("bubachico@gmail.com","Welcome to PADEL-PRO!!",`<h2> Bienvenido ${name}</h2><p>Gracias por llegar a registrate</p>`)
    return res.status(200).json({ status: "SUCCESS", data: newUser });
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "ERROR" });
  }
};

module.exports = { getAdminByEmailAndPassword, createAdmin };
