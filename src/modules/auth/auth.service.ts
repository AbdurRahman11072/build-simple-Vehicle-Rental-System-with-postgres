import Config from "../../config";
import { pool } from "../../db/db";
import bcrypt from "bcrypt";
import { user } from "./auth.type";

const createUser = async (payload: user) => {
  const { name, email, password, phone, role } = payload;

  const hashPassword = await bcrypt.hash(password, 10);
  return await pool.query(
    `
           INSERT INTO users (name, email, password, phone, role)
        VALUES ($1, $2, $3, $4, $5) RETURNING *
          `,
    [name, email, hashPassword, phone, role]
  );
};

export const authService = {
  createUser,
};
