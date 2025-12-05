import express from "express";
import Config from "./config";
import { initDB } from "./db/db";

const app = express();

app.use(express.json());

app.listen(Config.PORT, () => {
  console.log(`server is runnig on port : ${Config.PORT}`);
});
initDB();

export default app;
