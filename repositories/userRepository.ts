import { Database, MongoDBConnector } from "../deps.ts";
import { dbCreds } from "../config/db_config.ts";
import { User } from "../dbModels/user.ts";

const connector = new MongoDBConnector(dbCreds);
const db = new Database(connector);

export class UserRepository {
  /**
   * func that create new user
   * @param name
   * @returns User object
   */
  async createUser(name: string): Promise<User> {
    await db.sync();
    try {
      const user = new User();
      user.id = crypto.randomUUID();
      user.name = name;
      await user.save();
      return user;
    } catch (err) {
      console.log(err);
      throw (err);
    } finally {
      await db.close();
    }
  }

  /**
   * func that return list of users
   * @returns List of Users
   */
  async getUsers(): Promise<User[]> {
    await db.sync();
    try {
      return <User[]> await User.all();
    } catch (err) {
      console.log(err);
      throw (err);
    } finally {
      await db.close();
    }
  }

  /**
   * func that gets user by id
   * @param id
   * @returns User object
   */
  async getUserById(id: string): Promise<User> {
    await db.sync();
    try {
      const user: User = <User> await User.where("id", id).first();
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (err) {
      console.log(err);
      throw (err);
    } finally {
      await db.close();
    }
  }
}
