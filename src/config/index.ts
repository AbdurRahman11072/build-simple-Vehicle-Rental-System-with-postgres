import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const Config = {
  PORT: process.env.PORT,
};

export default Config;
