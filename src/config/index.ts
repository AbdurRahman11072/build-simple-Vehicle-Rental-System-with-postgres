import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const Config = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  BCRYPT_SALT: process.env.BCRYPT_SALT,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE_IN: process.env.JWT_EXPIRE_IN,
};

export default Config;
