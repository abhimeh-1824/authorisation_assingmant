const User = require("../module/user.module");
require("dotenv").config();
var jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    let registerData = await User.findOne({ email: req.body.email }).lean().exec();
    if (registerData) {
      return res.status(500).send({ message: "Email is already exit" });
    }

    registerData = await User.create(req.body);

    var token = jwt.sign({ registerData }, process.env.key);

    return res.status(200).send({ registerData, token });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const userdata = await User.findOne({ email: req.body.email });

    if (!userdata) {
      return res
        .status(500)
        .send({ message: "Email and Password not correct " });
    }

    const check = userdata.checkPassword(req.body.password);

    if (!check) {
      return res
        .status(500)
        .send({ message: "Email and Password not correct " });
    }

    var token = jwt.sign({ userdata }, process.env.key);
    return res.status(200).send({ userdata, token });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

module.exports = {register,login}
