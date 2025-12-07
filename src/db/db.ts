import { Pool } from "pg";
import Config from "../config";

export const pool = new Pool({
  connectionString: Config.DB_URL,
});

export const initDB = async () => {
  try {
    await pool.query(`



        CREATE TABLE IF NOT EXISTS Users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          phone VARCHAR(20) NOT NULL,
          role VARCHAR(10) CHECK (role IN ('admin', 'customer')) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );


       CREATE TABLE IF NOT EXISTS Vehicles (
          id SERIAL PRIMARY KEY,
          vehicle_name VARCHAR(255) NOT NULL,
          type VARCHAR(10) CHECK (type IN ('car', 'bike', 'van', 'SUV')) NOT NULL,
          registration_number VARCHAR(100) UNIQUE NOT NULL,
          daily_rent_price DECIMAL(10, 2) CHECK (daily_rent_price > 0) NOT NULL,
          availability_status VARCHAR(20) DEFAULT 'available' CHECK (availability_status IN ('available', 'cancelled','booked')),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      
      
      CREATE TABLE IF NOT EXISTS Bookings (
          id SERIAL PRIMARY KEY,
          customer_id INT REFERENCES Users(id) ON DELETE CASCADE,
          vehicle_id INT REFERENCES Vehicles(id) ON DELETE CASCADE,
          rent_start_date DATE NOT NULL,
          rent_end_date DATE NOT NULL,
          total_price DECIMAL(10, 2) CHECK (total_price > 0) NOT NULL,
          status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'returned')),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT check_dates CHECK (rent_end_date > rent_start_date)
      );
     
        
        `);

    console.log("Table created successfully");
  } catch (error) {
    console.log(`Error while creating table: `, error);
  }
};
