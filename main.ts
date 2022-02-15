import { Application } from "./deps.ts";
import router from "./routes/router.ts";
import { dbInit } from "./Util/helper.ts";
import { conf } from "./config/config.ts";

const appPort = conf.APP_PORT || 5000;

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await dbInit();

console.log(`Server running on port: ${appPort}`);

await app.listen({ port: appPort });
