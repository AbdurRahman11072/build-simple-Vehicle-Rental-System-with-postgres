import { pool } from "../../db/db";
import { VehiclesBooking } from "./booking.type";

const addBooking = async (payload: any) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const isVehicleExist = await pool.query(
    `
    SELECT vehicle_name, daily_rent_price,availability_status FROM Vehicles 
    WHERE id = $1`,
    [vehicle_id]
  );

  const vehicle = isVehicleExist.rows[0];

  if (vehicle.availability_status === "booked") {
    throw new Error("Vehicle is not available for booking");
  }

  const startDate = new Date(rent_start_date);
  const endDate = new Date(rent_end_date);

  const timeDiff = endDate.getTime() - startDate.getTime();
  const numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  console.log(numberOfDays);
  const total_price = vehicle.daily_rent_price * numberOfDays;

  const bookingDetails = await pool.query(
    `
    INSERT INTO bookingS(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );
  return {
    id: bookingDetails.rows[0].id,
    customer_id: bookingDetails.rows[0].customer_id,
    vehicle_id: bookingDetails.rows[0].vehicle_id,
    rent_start_date: bookingDetails.rows[0].rent_start_date,
    rent_end_date: bookingDetails.rows[0].rent_end_date,
    total_price,
    status: bookingDetails.rows[0].status,
    vehicle: {
      vehicle_name: vehicle.vehicle_name,
      daily_rent_price: vehicle.daily_rent_price,
    },
  };
};

export const bookingService = {
  addBooking,
};
