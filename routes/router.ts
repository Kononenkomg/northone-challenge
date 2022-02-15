import { Router } from "../deps.ts";
import { UserController } from "../controllers/userController.ts";

const userController = new UserController();
const router = new Router();


router.get("/api/users", userController.getUsers)
  .post("/api/user", userController.createUser);

  
export default router;