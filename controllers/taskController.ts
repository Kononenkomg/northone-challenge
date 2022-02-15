// deno-lint-ignore-file no-explicit-any
import { SubTask, Task } from "../dbModels/task.ts";
import { TaskRepository } from "../repositories/taskRepository.ts";
import { ErrorHandler, isValidSubTask, isValidTask } from "../Util/helper.ts";
import { UserRepository } from "../repositories/userRepository.ts";

const taskRepository = new TaskRepository();
const userRepository = new UserRepository();

//TODO: Create propper error handling
export class TaskController {
  //@desc API to create new task
  //@route POST /api/task
  createTask = async (
    { request, response }: { request: any; response: any },
  ) => {
    try {
      const body = await request.body();
      const data = await body.value;
      if (!isValidTask(data)) {
        throw new Error("Wrong task structure");
      }
      const user = await userRepository.getUserById(data.userId);
      if (!user) {
        throw new Error("User not found");
      }
      const task: Task = await taskRepository.createTask(data);
      response.status = 201;
      response.body = {
        success: true,
        data: task,
      };
    } catch (err) {
      return ErrorHandler(err, response);
    }
  };

  //@desc API to get all tasks for user
  //@route GET /api/tasks
  getTasks = async ({ request, response }: { request: any; response: any }) => {
    try {
      const filterStatus = await request.url.searchParams.get("status");
      const filterCategory = await request.url.searchParams.get("category");
      const userId: string = await request.url.searchParams.get("id");
      const user = await userRepository.getUserById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      const tasks: Task[] = await taskRepository.getTasks(
        userId,
        filterStatus,
        filterCategory,
      );
      if (tasks.length === 0) {
        throw new Error("No tasks found");
      }
      response.status = 200;
      response.body = {
        success: true,
        data: tasks,
      };
    } catch (err) {
      return ErrorHandler(err, response);
    }
  };

  //@desc API to update task
  //@route PUT /api/task
  updateTask = async (
    { request, response }: { request: any; response: any },
  ) => {
    try {
      const taskId: string = await request.url.searchParams.get("id");
      const body = await request.body();
      const data = await body.value;
      const task: Task = await taskRepository.updateTask(data, taskId);
      response.status = 200;
      response.body = {
        success: true,
        data: task,
      };
    } catch (err) {
      return ErrorHandler(err, response);
    }
  };

  //@desc API to delete task
  //@route DELETE /api/task
  deleteTask = async (
    { request, response }: { request: any; response: any },
  ) => {
    try {
      const taskId: string = await request.url.searchParams.get("id");
      await taskRepository.deleteTask(taskId);
      response.status = 200;
      response.body = {
        success: true,
        message: `Task deleted successfully`,
      };
    } catch (err) {
      return ErrorHandler(err, response);
    }
  };

  //@desc API to add subtask to task
  //@route POST /api/subtask
  createSubTask = async (
    { request, response }: { request: any; response: any },
  ) => {
    try {
      const body = await request.body();
      const data = await body.value;
      if (!isValidSubTask(data)) {
        throw new Error("Wrong sub task structure");
      }
      const task: Task = await taskRepository.getTaskById(data.taskId);
      if (!task) {
        throw new Error("Task not found");
      }
      const subTask: SubTask = await taskRepository.createSubTask(data);
      response.status = 201;
      response.body = {
        success: true,
        data: subTask,
      };
    } catch (err) {
      return ErrorHandler(err, response);
    }
  };

  //@desc API to update subtask
  //@route PATCH /api/subtask
  updateSubtask = async (
    { request, response }: { request: any; response: any },
  ) => {
    try {
      const subtaskId: string = await request.url.searchParams.get("id");
      const body = await request.body();
      const data = await body.value;
      const subTask: SubTask = await taskRepository.updateSubtask(
        subtaskId,
        data,
      );
      response.status = 200;
      response.body = {
        success: true,
        data: subTask,
      };
    } catch (err) {
      return ErrorHandler(err, response);
    }
  };

  //@desc API to delete subtask
  //@route DELETE /api/subtask
  deleteSubtask = async (
    { request, response }: { request: any; response: any },
  ) => {
    try {
      const subtaskId: string = await request.url.searchParams.get("id");
      await taskRepository.deleteSubtask(subtaskId);
      response.status = 200;
      response.body = {
        success: true,
        message: `Subtask deleted successfully`,
      };
    } catch (err) {
      return ErrorHandler(err, response);
    }
  };
}
