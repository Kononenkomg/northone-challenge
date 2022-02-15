// deno-lint-ignore-file no-explicit-any
import { Database, MongoDBConnector } from "../deps.ts";
import { dbCreds } from "../config/db_config.ts";
import { SubTask, Task } from "../dbModels/task.ts";
import { ITask } from "../interfaces/interfaces.ts";
import { isStatusValid } from "../Util/helper.ts";

const connector = new MongoDBConnector(dbCreds);
const db = new Database(connector);

export class TaskRepository {
  /**
   * Func that creates a new task
   * @param data
   * @returns Task object()
   */
  async createTask(data: any): Promise<Task> {
    await db.sync();
    try {
      const task = new Task();
      if (!data.status) {
        throw new Error("Status must be presented");
      }
      isStatusValid(data.status);
      task.hydrate(data);
      await task.save();
      return task;
    } catch (err) {
      console.log(err);
      throw (err);
    } finally {
      await db.close();
    }
  }

  /**
   * Func that returns all tasks for a user
   * @param userId
   * @returns list of task interfaces
   */
  //TODO: Add page and limit
  async getTasks(
    userId: string,
    status?: string,
    category?: string,
  ): Promise<ITask[]> {
    await db.sync();
    try {
      let tasks: ITask[] = [];
      if (status && category) {
        tasks = <ITask[]> await Task.where("userId", userId).where(
          "status",
          status,
        ).where("category", category).all();
      } else if (status && !category) {
        tasks = <ITask[]> await Task.where("userId", userId).where(
          "status",
          status,
        ).all();
      } else if (!status && category) {
        tasks = <ITask[]> await Task.where("userId", userId).where(
          "category",
          category,
        ).all();
      } else {
        tasks = <ITask[]> await Task.where("userId", userId).all();
      }

      for await (const task of tasks) {
        if (status) {
          task.subTasks = <SubTask[]> await SubTask.where("taskId", task.id)
            .where("status", status).all();
        } else {
          task.subTasks = <SubTask[]> await SubTask.where("taskId", task.id)
            .all();
        }
      }
      return tasks;
    } catch (err) {
      console.log(err);
      throw (err);
    } finally {
      await db.close();
    }
  }

  /**
   * func that returns task by id
   * @param id
   * @returns Task object
   */

  async getTaskById(id: string): Promise<Task> {
    await db.sync();
    try {
      return <Task> await Task.where("id", id).first();
    } catch (err) {
      console.log(err);
      throw (err);
    } finally {
      await db.close();
    }
  }

  /**
   * Func that updates a task
   * @param data
   * @param taskId
   * @returns Task object
   */
  async updateTask(data: any, taskId: string): Promise<Task> {
    await db.sync();
    try {
      const task = <Task> await Task.where("id", taskId).first();
      if (!task) {
        throw new Error("Task not found");
      }
      isStatusValid(data.status);
      data.title !== null ? task.title = data.title : null;
      data.description !== null ? task.description = data.description : null;
      data.due !== null ? task.due = data.due : null;
      data.category !== null ? task.category = data.category : null;
      data.status !== null ? task.status = data.status : null;

      await task.update();
      return <Task> await Task.where("id", taskId).first();
    } catch (err) {
      console.log(err);
      throw (err);
    } finally {
      await db.close();
    }
  }

  /**
   * Func that deletes a task
   * @param taskId
   * @returns void
   */
  async deleteTask(id: string): Promise<void> {
    await db.sync();
    try {
      const task = await Task.where("id", id).first();
      if (!task) {
        throw new Error("Task not found");
      }
      const subTasks: SubTask[] = <SubTask[]> await SubTask.where("taskId", id)
        .all();
      for await (const sbTsk of subTasks) {
        await sbTsk.delete();
      }
      await task.delete();
    } catch (err) {
      console.log(err);
      throw (err);
    } finally {
      await db.close();
    }
  }

  /**
   * Func that creates a new subtask
   * @param data
   * @param taskId
   * @returns SubTask object
   */
  async createSubTask(data: any): Promise<SubTask> {
    await db.sync();
    try {
      const subTask = new SubTask();
      if (!data.status) {
        throw new Error("Status must be presented");
      }
      isStatusValid(data.status);
      subTask.hydrate(data);
      await subTask.save();
      return subTask;
    } catch (err) {
      console.log(err);
      throw (err);
    } finally {
      await db.close();
    }
  }

  /**
   * Func that updates subtask
   * @param subtaskId
   * @param data
   * @returns Subtask object
   */
  async updateSubtask(subtaskId: string, data: any): Promise<SubTask> {
    await db.sync();
    try {
      const subTask = <SubTask> await SubTask.where("id", subtaskId).first();
      if (!subTask) {
        throw new Error("Subtask not found");
      }
      isStatusValid(data.status);
      data.title !== null ? subTask.title = data.title : null;
      data.description !== null ? subTask.description = data.description : null;
      data.due !== null ? subTask.due = data.due : null;
      data.status !== null ? subTask.status = data.status : null;
      await subTask.update();
      return <SubTask> await SubTask.where("id", subtaskId).first();
    } catch (err) {
      console.log(err);
      throw (err);
    } finally {
      await db.close();
    }
  }

  /**
   * Func that delete subtask
   * @param subtaskId
   * @return void
   */
  async deleteSubtask(id: string): Promise<void> {
    await db.sync();
    try {
      const subTask = await SubTask.where("id", id).first();
      if (!subTask) {
        throw new Error("Subtask not found");
      }
      await subTask.delete();
    } catch (err) {
      console.log(err);
      throw (err);
    } finally {
      await db.close();
    }
  }
}
