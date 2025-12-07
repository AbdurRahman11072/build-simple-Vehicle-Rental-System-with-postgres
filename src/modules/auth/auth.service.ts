import Config from "../../config";
import { pool } from "../../db/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { signinUser, signupUser } from "./auth.type";

const singup = async (payload: signupUser) => {
  const { name, email, password, phone, role } = payload;

  const hashPassword = await bcrypt.hash(password, 10);
  return await pool.query(
    `
           INSERT INTO users (name, email, password, phone, role)
        VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, phone, role
          `,
    [name, email, hashPassword, phone, role]
  );
};

const signin = async (payload: signinUser) => {
  const { email, password } = payload;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  const userResult = await pool.query(
    `
    SELECT * FROM   users
    WHERE email = $1
    `,
    [email]
  );

  if (userResult.rows.length === 0) {
    throw new Error("No user found with this email");
  }
  const user = userResult.rows[0];
  const isuserMatch = await bcrypt.compare(password, user.password);

  if (!isuserMatch) {
    throw new Error("Wrong password. please try again");
  }
  const jwtPaylod = {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
  };

  const Token = await jwt.sign(jwtPaylod, Config.JWT_SECRET as string, {
    expiresIn: 1000 * 60 * 60 * 24,
  });

  return {
    token: Token,
    user: jwtPaylod,
  };
};

export const authService = {
  singup,
  signin,
};
