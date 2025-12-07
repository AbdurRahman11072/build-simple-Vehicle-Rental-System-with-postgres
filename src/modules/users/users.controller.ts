import { Request, Response } from "express";
import httpStatus from "http-status";
import { userService } from "./users.service";

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUser();
    if (result.rows.length === 0) {
      res.status(httpStatus.OK).json({
        success: true,
        message: "No user found",
        data: [],
      });
    }

    res.status(httpStatus.OK).json({
      success: true,
      message: "User retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const id = req.user?.id;
    const payload = req.body;
    const result = await userService.updateUser(userId as string, payload);

    res.status(httpStatus.OK).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.deleteUserById(userId as string);

    res.status(httpStatus.OK).json({
      success: true,
      message: "User deleted successfully",
      data: null,
    });
  } catch (error: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong",
      data: error.message,
    });
  }
};

export const userController = {
  getAllUser,
  updateUser,
  deleteUser,
};
