import Task from "../models/task.model.js";

export const create_task = async (req, res) => {
  const { title, bodyTask } = req.body;

  const createdBy = req.user.id;

  try {
    const newTask = new Task({
      title,
      bodyTask,
      createdBy,
    });

    await newTask.save();

    res.redirect("/profile");
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error: ${error}`);
  }
};

export const edit_task = async (req, res) => {
  const { taskId, title, bodyTask } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(taskId, { title, bodyTask });

    res.redirect("/profile");
  } catch (error) {
    res.status(400).send(error);
  }
};

export const delete_task = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findByIdAndDelete(taskId);
    res.redirect("/profile");
  } catch (error) {
    res.status(400).send(error);
  }
};
