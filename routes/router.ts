import { Router } from "../deps.ts";
import { UserController } from "../controllers/userController.ts";
import { TaskController } from "../controllers/taskController.ts";

const userController = new UserController();
const taskController = new TaskController();
const router = new Router();

router.get("/api/users", userController.getUsers)
  .post("/api/user", userController.createUser)
  //Task Calls;
  .post("/api/task", taskController.createTask)
  .get("/api/task", taskController.getTasks)
  .patch("/api/task", taskController.updateTask)
  .delete("/api/task", taskController.deleteTask)
  //Sub Task Calls;
  .post("/api/subtask", taskController.createSubTask)
  .patch("/api/subtask", taskController.updateSubtask)
  .delete("/api/subtask", taskController.deleteSubtask);

export default router;
