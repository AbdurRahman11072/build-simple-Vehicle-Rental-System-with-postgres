import { Request, response, Response } from "express";
import httpStatus from "http-status";

import { authService } from "./auth.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const result = await authService.createUser(payload);

    res.status(httpStatus.CREATED).json({
      success: true,
      message: "User registered successfully",
      result: result.rows[0],
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Failed to register user",
    });
  }
};

export const authConroller = {
  createUser,
};
