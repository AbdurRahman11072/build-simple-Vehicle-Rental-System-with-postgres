import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import Config from "../config";

export const auth = (role: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1] as string;
    console.log(token);

    if (!token) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Your are not authorized",
      });
    }

    const decode = (await jwt.verify(
      token,
      Config.JWT_SECRET as string
    )) as JwtPayload;

    const result = role.includes(decode.role);

    if (!role.includes(decode.role)) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Your are not authorized",
      });
    }
    console.log(result);

    next();
  };
};
