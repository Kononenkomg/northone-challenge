// deno-lint-ignore-file no-explicit-any
import { UserRepository } from "../repositories/userRepository.ts";
import { User } from "../dbModels/user.ts";
import { ErrorHandler } from "../Util/helper.ts";

const userRepository = new UserRepository();

export class UserController {
  //@desc API to create user
  //@route POST /api/user
  createUser = async (
    { request, response }: { request: any; response: any },
  ) => {
    try {
      const body = await request.body();
      const data: { name: string } = await body.value;
      if (!data.name) {
        throw new Error("Wrong user structure");
      }
      const user: User = await userRepository.createUser(data.name);
      response.status = 201;
      response.body = {
        success: true,
        data: user,
      };
    } catch (err) {
      return ErrorHandler(err, response);
    }
  };

  //@desc API to get all users
  //@route GET /api/users
  getUsers = async ({ response }: { response: any }) => {
    try {
      const users: User[] = await userRepository.getUsers();
      response.status = 200;
      response.body = {
        success: true,
        data: users,
      };
    } catch (err) {
      return ErrorHandler(err, response);
    }
  };
}
