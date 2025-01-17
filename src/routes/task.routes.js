import { Router } from "express";
import {
  create_task,
  edit_task,
  delete_task,
} from "../controllers/task_controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post("/create-task", authRequired, create_task);

router.post("/edit-task", authRequired, edit_task);

router.get("/delete-task/:id", authRequired, delete_task);

export default router;
