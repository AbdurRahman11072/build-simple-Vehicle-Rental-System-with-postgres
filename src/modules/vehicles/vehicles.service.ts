import { pool } from "../../db/db";
import { createVehiclesPayload, updateVehiclesPayload } from "./vehicles.type";

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
  const is_user_have_booking = await pool.query(
    `SELECT customer_id, status FROM bookings WHERE vehicle_id =$1 AND status= 'active'`,
    [payload]
  );

  if (is_user_have_booking.rows.length !== 0) {
    throw new Error(
      "Vehicle has been booked. Please try deleting vehicle after vehicle is returned"
    );
  }

  return await pool.query(
    `
        DELETE FROM  vehicles
        WHERE id= $1`,
    [payload]
  );
};
const updateVehiclesById = async (
  vehicleId: string,
  payload: updateVehiclesPayload
) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  const isVehiclesExist = await pool.query(
    `
        SELECT * FROM vehicles
        WHERE id = $1`,
    [vehicleId]
  );
  const vehical = isVehiclesExist.rows[0];

  const newVehicle_name = vehicle_name || vehical.vehicle_name;
  const newType = type || vehical.type;
  const newRegistration_number =
    registration_number || vehical.registration_number;
  const newDaily_rent_price = daily_rent_price || vehical.daily_rent_price;
  const newAvailability_status =
    availability_status || vehical.availability_status;

  return await pool.query(
    `
    UPDATE vehicles
    SET vehicle_name= $1, type= $2, registration_number =$3,daily_rent_price =$4,availability_status=$5
    WHERE id = $6  RETURNING 
    id, vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status`,
    [
      newVehicle_name,
      newType,
      newRegistration_number,
      newDaily_rent_price,
      newAvailability_status,
      vehicleId,
    ]
  );
};

export const vehicalesService = {
  createVehicles,
  getAllVehicles,
  getVehiclesById,
  deleteVehiclesById,
  updateVehiclesById,
};
