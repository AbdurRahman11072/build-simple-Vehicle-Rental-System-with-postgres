import { Request, response, Response } from "express";
import httpStatus from "http-status";

import { authService } from "./auth.service";

const singup = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const result = await authService.singup(payload);

    res.status(httpStatus.CREATED).json({
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Failed to register user",
    });
  }
};
const signin = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const result = await authService.signin(payload);

    res.status(httpStatus.CREATED).json({
      success: true,
      message: "Signin successful",
      data: result,
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Failed to signin",
    });
  }
};

export const authConroller = {
  singup,
  signin,
};
