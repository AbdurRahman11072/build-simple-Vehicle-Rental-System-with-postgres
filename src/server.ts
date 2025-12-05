import express from "express";
import Config from "./config";
import { initDB } from "./db/db";
import { appRouter } from "./routers";

const app = express();

app.use(express.json());

app.use(appRouter);

app.listen(Config.PORT, () => {
  console.log(`server is runnig on port : ${Config.PORT}`);
});
initDB();

export default app;
