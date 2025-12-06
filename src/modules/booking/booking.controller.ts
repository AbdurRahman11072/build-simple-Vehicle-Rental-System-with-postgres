import { Request, Response } from "express";
import httpsStatus from "http-status";
import { bookingService } from "./booking.service";
import { VehiclesBooking } from "./booking.type";

const addBooking = async (req: Request, res: Response) => {
  try {
    const payload: VehiclesBooking = req.body;

    const result = await bookingService.addBooking(payload);
    console.log(result);

    res.status(httpsStatus.CREATED).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(httpsStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong. Please try again!!",
      error: error.message,
    });
  }
};
export const bookingController = {
  addBooking,
};
