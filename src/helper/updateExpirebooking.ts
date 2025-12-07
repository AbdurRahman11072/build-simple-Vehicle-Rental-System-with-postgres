import { pool } from "../db/db";

export const updateExpiredBookings = async () => {
  await pool.query(`
    WITH updated_bookings AS (
      UPDATE bookings 
      SET status = 'returned'
      WHERE rent_end_date < CURRENT_DATE 
      AND status = 'active'
      RETURNING id, vehicle_id
    ),
    updated_vehicles AS (
      UPDATE vehicles 
      SET availability_status = 'available'
      WHERE id IN (SELECT vehicle_id FROM updated_bookings)
    )
    SELECT 1
  `);
};
