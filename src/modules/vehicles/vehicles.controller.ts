import { Request, Response } from "express";
import httpStatus from "http-status";
import { vehicalesService } from "./vehicles.service";

const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const result = await vehicalesService.getAllVehicles();

    if (result.rows.length === 0) {
      return res.status(httpStatus.CREATED).json({
        success: true,
        message: "No vehicles found",
        data: [],
      });
    }

    res.status(httpStatus.CREATED).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: error.message,
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
      message: error.message,
    });
  }
};

const getVehiclesById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await vehicalesService.getVehiclesById(id as string);

    if (result.rows.length === 0) {
      return res.status(httpStatus.CREATED).json({
        success: true,
        message: "No vehicles found",
        data: [],
      });
    }

    res.status(httpStatus.CREATED).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "",
      data: error.message,
    });
  }
};
const deleteVehiclesById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await vehicalesService.deleteVehiclesById(id as string);

    if (result.rows.length === 0) {
      return res.status(httpStatus.CREATED).json({
        success: true,
        message: "No vehicles found",
        data: [],
      });
    }

    res.status(httpStatus.CREATED).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: null,
    });
  } catch (error: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "",
      data: error.message,
    });
  }
};

export const vehicalesController = {
  createVehicles,
  getAllVehicles,
  getVehiclesById,
  deleteVehiclesById,
};
