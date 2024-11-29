import { FileHandler } from '../utils/fileHandler.js';
import { v4 as uuid } from 'uuid';

export class TaskService {
  constructor() {
    this.fileHandler = new FileHandler(`${process.cwd()}/data.json`);
  }

  async createTask(task) {
    const tasks = await this.fileHandler.getData()

    task.id = uuid()

    tasks.push(task);
    await this.fileHandler.saveData(tasks);
    return task;
  }

  async updateTask(taskIndex, updatedTask) {
    const tasks = await this.fileHandler.getData()

    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };

    await this.fileHandler.saveData(tasks);

    return tasks[taskIndex];
  }

  async getTask(taskId) {
    const tasks = await this.fileHandler.getData()
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) return null;

    const task = tasks[taskIndex];

    return {
      task,
      index: taskIndex,
    };
  }

  async getAllTasks(status) {
    const tasks = await this.fileHandler.getData()
    if (status) {
      return tasks.filter((task) => task.status === status);
    }
    return tasks;
  }

  async deleteTask(taskIndex,) {
    const tasks = await this.fileHandler.getData()

    tasks.splice(taskIndex, 1);

    await this.fileHandler.saveData(tasks);
    return true;
  }
}

