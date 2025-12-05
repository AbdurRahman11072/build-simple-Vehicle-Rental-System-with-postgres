import express from "express";
import { config } from "./config/config";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(config.PORT, () => {
  console.log(`Example app listening on port ${config.PORT}`);
});

export default app;
