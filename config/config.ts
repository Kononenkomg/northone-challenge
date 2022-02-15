const env = Deno.env.get("ENVIRONMENT");
console.log(`ENVIRONMENT: ${env}`);

export const conf = {
  APP_PORT: 4000,
  DB_DATABASE: "todo",
  DB_URI: env ? "mongodb://mongo:27017" : "mongodb://localhost:27017",
};
