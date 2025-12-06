import { pool } from "../../db/db";
import { createVehiclesPayload } from "./vehicles.type";

const getAllVehicles = async () => {
  const result = await pool.query(`
        SELECT * FROM vehicles`);

  return result;
};

const createVehicles = async (payload: createVehiclesPayload) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  return await pool.query(
    `
          INSERT INTO Vehicles (vehicle_name, type, registration_number,daily_rent_price,availability_status) VALUES ($1, $2, $3, $4, $5) RETURNING *
          `,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );
};

const getVehiclesById = async (payload: string) => {
  return await pool.query(
    `
        SELECT * FROM  vehicles
        WHERE id= $1`,
    [payload]
  );
};
const deleteVehiclesById = async (payload: string) => {
  return await pool.query(
    `
        DELETE FROM  vehicles
        WHERE id= $1`,
    [payload]
  );
};

export const vehicalesService = {
  createVehicles,
  getAllVehicles,
  getVehiclesById,
  deleteVehiclesById,
};
