import { config } from "../deps.ts";

const dbCreds = {
  uri: config().DB_URI,
  database: config().DB_DATABASE,
};

export { dbCreds };
