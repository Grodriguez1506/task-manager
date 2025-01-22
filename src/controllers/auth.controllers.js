import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccesToken } from "../libs/jwt.js";
import { calcularEdad } from "./functions.controllers.js";

export const register = async (req, res) => {
  const { firstName, lastName, email, password, dateOfBirth } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "El email ya se encuentra registrado",
      field: "email",
    });
  }

  if (password.length <= 5) {
    return res.status(400).json({
      success: false,
      message: "La contraseña debe contener al menos 6 caracteres",
      field: "password",
    });
  }

  const userAge = calcularEdad(dateOfBirth);

  if (userAge < 18) {
    return res.status(400).json({
      success: false,
      message: "Debes ser mayor de 18 años para registrarte",
      field: "age",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      dateOfBirth,
    });

    await newUser.save();
    res.status(201).json({
      success: true,
      message: "Usuario registrado con éxito",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al procesar el registro. Intente de nuevo.",
      field: "general",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });

    if (!userFound) {
      return res.status(400).json({
        success: false,
        message: "Credenciales inválidas",
      });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Credenciales inválidas",
      });
    }

    const token = await createAccesToken({ id: userFound._id });

    res.cookie("token", token);

    res.status(201).json({
      success: true,
      message: "Usuario autenticado con exito",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en el servidor",
    });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    return res.redirect("/login");
  } catch (error) {
    res.send("Error en loggeo");
  }
};
