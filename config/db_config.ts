import { conf } from "../config/config.ts";

const dbCreds = {
  uri: conf.DB_URI,
  database: conf.DB_DATABASE,
};

export { dbCreds };
