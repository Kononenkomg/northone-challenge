import { assertEquals, assertExists } from "../deps.ts";
import { UserRepository } from "../repositories/userRepository.ts";
import { User } from "../dbModels/user.ts";
import { Database, MongoDBConnector } from "../deps.ts";
import { dbCreds } from "../config/db_config.ts";

const userRepository = new UserRepository();
const connector = new MongoDBConnector(dbCreds);
const db = new Database(connector);
db.link([User]);
await db.sync();

Deno.test("Test if any users exists", async () => {
  const resp = await userRepository.createUser("test");
  assertExists(await userRepository.getUsers());
  await User.deleteById(resp.id);
});

Deno.test("Test user create", async () => {
  const resp = await userRepository.createUser("MaksTest");
  assertExists(resp);
  assertEquals(resp.name, "MaksTest");

  //Delete test data from db
  await User.deleteById(resp.id);
});

Deno.test("Test if created user is proper type", async () => {
  const resp = await userRepository.createUser("MaksTest");
  const testUser: { id: string; name: string } = { id: "", name: "" };
  assertEquals(typeof resp, typeof testUser);

  //Delete test data from db
  await User.deleteById(resp.id);
});

Deno.test("Test get user by id", async () => {
  const resp = await userRepository.createUser("MaksTest");
  const user = await userRepository.getUserById(resp.id);
  assertExists(user);
  assertEquals(user.name, "MaksTest");

  //Delete test data from db
  await User.deleteById(resp.id);
});
