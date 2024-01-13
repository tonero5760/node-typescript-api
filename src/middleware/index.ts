import jwt, { GetPublicKeyOrSecret, Secret } from "jsonwebtoken";
import { NextFunction, Request, Response, Router } from "express";

import UserModel from "../models/user.model";

export interface AuthRequest extends Request {
  user?: string;
}

export const authenticationMiddleWare = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  console.log("Run auth");

  if (!req.headers["authorization"]) {
    return res.status(401).json({
      message: "No token provided",
    });
  }
  const authHeader = req.headers["authorization"];
  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];

  jwt.verify(token, `${process.env.SECRET_KEY}`, (err: any, user: any) => {
    if (err) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    req.user = user;
    next();
  });
};
