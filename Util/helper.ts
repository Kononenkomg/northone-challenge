// deno-lint-ignore-file no-explicit-any
import { Database, MongoDBConnector } from "../deps.ts";
import { dbCreds } from "../config/db_config.ts";
import { SubTask, Task } from "../dbModels/task.ts";
import { User } from "../dbModels/user.ts";

const PENDING_ENUM = "Pending";
const DONE_ENUM = "Done";
const statuses = [PENDING_ENUM, DONE_ENUM];

export const isValidTask = (task: any): boolean => {
  if (task.due && new Date(task.due) < new Date()) {
    throw new Error("Task due date cannot be in the past");
  }
  if (
    task.title &&
    task.description &&
    task.userId
  ) {
    return true;
  }
  return false;
};

export const isValidSubTask = (subTask: any): boolean => {
  if (subTask.due && new Date(subTask.due) < new Date()) {
    throw new Error("Task due date cannot be in the past");
  }
  if (
    subTask.title && subTask.description && subTask.taskId && subTask.taskId
  ) {
    return true;
  }
  return false;
};

export const ErrorHandler = (err: Error, response: any) => {
  response.status = 500;
  response.body = {
    success: false,
    message: err.message,
  };
  return response;
};

export const dbInit = async () => {
  const connector = new MongoDBConnector(dbCreds);
  const db = new Database(connector);
  db.link([User, Task, SubTask]);
  await db.sync();
  await db.close();
  console.log("db initialized");
};

export const isStatusValid = (status: string): void => {
  if (status && statuses.includes(status)) {
    return;
  } else {
    throw new Error("Wrong status");
  }
};
