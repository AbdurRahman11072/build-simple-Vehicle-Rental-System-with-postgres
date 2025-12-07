import { AuthUser } from "./../utils/auth.d";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import Config from "../config";

export const auth = (role: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1] as string;

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

    if (!role.includes(decode.role)) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Your are not authorized",
      });
    }

    req.user = {
      name: decode.name,
      email: decode.email,
      phone: decode.phone,
      role: decode.role,
    };

    next();
  };
};
