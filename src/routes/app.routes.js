import { Router } from "express";
import User from "../models/user.model.js";
import Task from "../models/task.model.js";
import {
  authRequired,
  redirectAuthenticated,
} from "../middlewares/validateToken.js";

const router = Router();

router.get("/", redirectAuthenticated, (req, res) => {
  res.redirect("/login");
});

router.get("/register", redirectAuthenticated, (req, res) => {
  const usuario = "";
  res.render("register", {
    title: "Registrate",
    usuario,
  });
});

router.get("/login", redirectAuthenticated, (req, res) => {
  const usuario = "";

  res.render("login", {
    title: "Iniciar sesión",
    usuario,
  });
});

router.get("/profile", authRequired, async (req, res) => {
  const userFound = await User.findById(req.user.id);

  const userTasks = await Task.find({ createdBy: userFound._id });

  return res.render("profile", {
    title: `Perfil de usuario ${userFound.email}`,
    usuario: userFound,
    tasks: userTasks,
  });
});

router.get("/new-task", authRequired, async (req, res) => {
  const userFound = await User.findById(req.user.id);

  res.render("create_task", {
    title: "Crear tarea",
    usuario: userFound,
  });
});

router.get("/edit-task/:id", authRequired, async (req, res) => {
  const userFound = await User.findById(req.user.id);
  const taskId = req.params.id;

  const taskFound = await Task.findById(taskId);

  res.render("edit_task", {
    usuario: userFound,
    title: "Crear tarea",
    task: taskFound,
  });
});

export default router;
