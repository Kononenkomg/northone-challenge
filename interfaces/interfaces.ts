// deno-lint-ignore-file no-explicit-any
import { Task } from "../dbModels/task.ts";

export interface ITask extends Task {
  subTasks: any;
}
