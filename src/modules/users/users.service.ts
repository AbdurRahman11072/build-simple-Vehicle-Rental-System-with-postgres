import { pool } from "../../db/db";
import { signupUser } from "../auth/auth.type";

const getAllUser = async () => {
  return await pool.query(`
        SELECT * FROM users`);
};

const updateUser = async (userId: string, payload: signupUser) => {
  const { name, email, phone, role } = payload;
  const isUserExist = await pool.query(
    `
        SELECT * FROM users
        WHERE id = $1`,
    [userId]
  );
  if (isUserExist.rows.length === 0) {
    throw new Error("User not found");
  }
  const user = isUserExist.rows[0];

  const newName = name || user.name;
  const newEmail = email || user.email;
  const newPhone = phone || user.phone;
  const newRole = role || user.role;
  console.log(newEmail);

  return await pool.query(
    `UPDATE users
    SET name= $1, email= $2, phone =$3,role =$4 WHERE id = $5  RETURNING id,name, email, phone, role`,
    [newName, newEmail, newPhone, newRole, userId]
  );
};

const deleteUserById = async (payload: string) => {
  return await pool.query(
    `
        DELETE FROM  users
        WHERE id= $1`,
    [payload]
  );
};

export const userService = {
  getAllUser,
  updateUser,
  deleteUserById,
};
