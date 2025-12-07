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

const getAllBooking = async (req: Request, res: Response) => {
  try {
    const role = req.user?.role || "customer";
    console.log(role);

    const result = await bookingService.getAllBooking(role as string);
    res.status(httpsStatus.CREATED).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(httpsStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong. Please try again!!",
      error: error.message,
    });
  }
};

const updateBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const role = req.user?.role;

    const result = await bookingService.updateBooking(
      id as string,
      status,
      role as string
    );
    res.status(httpsStatus.OK).json({
      success: true,
      message: "Bookings retrieved successfully",
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
  getAllBooking,
  updateBooking,
};
