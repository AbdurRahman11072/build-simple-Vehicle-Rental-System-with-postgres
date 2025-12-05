import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const Config = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  BCRYPT_SALT: process.env.BCRYPT_SALT,
};

export default Config;
