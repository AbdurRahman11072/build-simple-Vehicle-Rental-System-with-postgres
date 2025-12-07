import { Request, Response } from "express";
import httpStatus from "http-status";
import { vehicalesService } from "./vehicles.service";

const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicalesService.getAllVehicles();

    if (result.rows.length === 0) {
      return res.status(httpStatus.OK).json({
        success: true,
        message: "No vehicles found",
        data: [],
      });
    }

    res.status(httpStatus.OK).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong. Please try again!!",
      error: error.message,
    });
  }
};

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
      message:
        "Failed to create vehicles. Something went wrong. Please try again!!",
      error: error.message,
    });
  }
};

const getVehiclesById = async (req: Request, res: Response) => {
  try {
    const { vehicleId } = req.params;

    const result = await vehicalesService.getVehiclesById(vehicleId as string);

    if (result.rows.length === 0) {
      return res.status(httpStatus.OK).json({
        success: true,
        message: "No vehicles found",
        data: [],
      });
    }

    res.status(httpStatus.OK).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message:
        "Vehicles retrieved failed. Something went wrong. Please try again!!",
      error: error.message,
    });
  }
};
const deleteVehiclesById = async (req: Request, res: Response) => {
  try {
    const { vehicleId } = req.params;

    const result = await vehicalesService.deleteVehiclesById(
      vehicleId as string
    );

    if (result.rows.length === 0) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: true,
        message: "Vehicle deleted successfully",
        data: [],
      });
    }

    res.status(httpStatus.OK).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: null,
    });
  } catch (error: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong. Please try again!!",
      error: error.message,
    });
  }
};

const updateVehiclesById = async (req: Request, res: Response) => {
  try {
    const { vehicleId } = req.params;
    const payload = req.body;

    const result = await vehicalesService.updateVehiclesById(
      vehicleId as string,
      payload
    );
    res.status(httpStatus.OK).json({
      success: true,
      message: "Vehicles updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong. Please try again!!",
      error: error.message,
    });
  }
};

export const vehicalesController = {
  createVehicles,
  getAllVehicles,
  getVehiclesById,
  deleteVehiclesById,
  updateVehiclesById,
};
