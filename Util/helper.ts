// deno-lint-ignore-file no-explicit-any
import { Database, MongoDBConnector } from "../deps.ts";
import { dbCreds } from "../config/db_config.ts";
import { User } from "../dbModels/user.ts";


export const dbInit = async () => {
  const connector = new MongoDBConnector(dbCreds);
  const db = new Database(connector);
  db.link([User]);
  await db.sync();
  await db.close();
  console.log("db initialized");
};

export const ErrorHandler = (err: Error, response: any) => {
  response.status = 500;
  response.body = {
    success: false,
    message: err.message,
  };
  return response;
};

