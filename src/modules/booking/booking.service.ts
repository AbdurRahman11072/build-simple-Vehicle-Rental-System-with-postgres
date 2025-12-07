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
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (startDate < today) {
    throw new Error("Start date cannot be in the past");
  }

  if (endDate <= startDate) {
    throw new Error("End date must be after start date");
  }

  const timeDiff = endDate.getTime() - startDate.getTime();
  const numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  if (numberOfDays < 1) {
    throw new Error("Minimum booking duration is 1 day");
  }
  const total_price = vehicle.daily_rent_price * numberOfDays;

  const bookingDetails = await pool.query(
    `
    INSERT INTO bookingS(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price) VALUES ($1, $2, $3, $4, $5) RETURNING  id, customer_id, vehicle_id, rent_start_date, 
      rent_end_date, total_price, status`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );

  const updateVehiclesDetails = await pool.query(
    `
    UPDATE vehicles
    SET availability_status= 'booked' WHERE id =$1`,
    [vehicle_id]
  );

  return {
    ...bookingDetails.rows[0],
    vehicle: {
      vehicle_name: vehicle.vehicle_name,
      daily_rent_price: vehicle.daily_rent_price,
    },
  };
};

const getAllBooking = async (role: string) => {
  if (role === "admin") {
    return await pool.query(`SELECT 
          b.id,
          b.customer_id,
          b.vehicle_id,
          b.rent_start_date,
          b.rent_end_date,
          b.total_price,
          b.status,
          json_build_object(
            'name', u.name,
            'email', u.email
          ) as customer,
          json_build_object(
            'vehicle_name', v.vehicle_name,
            'registration_number', v.registration_number
          ) as vehicle
        FROM bookings b
        JOIN users u ON b.customer_id = u.id
        JOIN vehicles v ON b.vehicle_id = v.id
        ORDER BY b.created_at DESC
        `);
  }

  return await pool.query(`SELECT 
          b.id,
          b.customer_id,
          b.vehicle_id,
          b.rent_start_date,
          b.rent_end_date,
          b.total_price,
          b.status,
         
          json_build_object(
            'vehicle_name', v.vehicle_name,
            'registration_number', v.registration_number, 'type' ,v.type
          ) as vehicle
        FROM bookings b
        JOIN vehicles v ON b.vehicle_id = v.id
        ORDER BY b.created_at DESC
        `);
};

export const bookingService = {
  addBooking,
  getAllBooking,
};
