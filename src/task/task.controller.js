import { TaskService } from './task.service.js';

const taskService = new TaskService();

export const getAllTasks = async (_req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllTasksBystatus = async (req, res) => {
  try {
    const status = req.params.status;

    const tasks = await taskService.getAllTasks(status);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await taskService.getTask(req.params.id);
    if (!task) return res.status(400).json({ message: 'Task not found' });

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const newTask = await taskService.createTask({
      title,
      description,
      status,
    });

    res.status(201).json({
      message: 'Task created successfully',
      task: newTask,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await taskService.getTask(req.params.id);
    if (!task) return res.status(400).json({ message: 'Task not found' });

    const { title, description, status } = req.body;

    const updatedTask = await taskService.updateTask(task.index, {
      title,
      description,
      status,
    });

    res.status(200).json({
      message: 'Task updated successfully',
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await taskService.getTask(req.params.id);
    if (!task) return res.status(400).json({ message: 'Task not found' });

    await taskService.deleteTask(task.index);
    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
