import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccesToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  const { firstName, lastName, email, password, dateOfBirth } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      dateOfBirth,
    });

    const userCreated = await newUser.save();
    const token = await createAccesToken({ id: userCreated._id });

    res.cookie("token", token);

    res.redirect("/login");
  } catch (error) {
    console.log(error);
    res.send("Error en el registro");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });

    if (!userFound) return res.status(400).send("Credenciales inválidas");

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) return res.status(400).send("Credenciales inválidas");

    const token = await createAccesToken({ id: userFound._id });

    res.cookie("token", token);

    res.redirect("/profile");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en la autenticación");
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("token", "", {
      expires: new Date(0),
    });
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
    res.send("Error en loggeo");
  }
};
