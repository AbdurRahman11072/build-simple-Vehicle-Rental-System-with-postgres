import { Request, Response } from "express";
import httpStatus from "http-status";
import { vehicalesService } from "./vehicles.service";

const createVehicles = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const result = await vehicalesService.createVehicles(payload);

    res.status(httpStatus.CREATED).json({
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

export const vehicalesController = {
  createVehicles,
};
