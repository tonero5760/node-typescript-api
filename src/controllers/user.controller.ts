import bcrypt from "bcrypt";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import IUser from "../interface/user.interface";
import UserModel from "../models/user.model";

const getUserToken = (_id: string | Types.ObjectId) => {
  const { SECRET_KEY } = process.env;
  const authUserToken = jwt.sign({ _id },`${SECRET_KEY}`,{
    expiresIn: "7d",
  });
  return authUserToken;
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, firstname, lastname }: IUser = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await UserModel.create({
      email: email,
      password: hashedPassword,
      firstname: firstname,
      lastname: lastname,
    });

    return res.status(201).send({ message: "User created succeesfully" });
  } catch (error) {
    console.log("Error creating user", error);
    throw error;
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password }: IUser = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res.status(409).send({ message: "User doesnt exist" });
    }
    const isPasswordIdentical = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isPasswordIdentical) {
      //get user token
      const token = getUserToken(existingUser._id);
      return res.send({
        token,
        user: {
          email: existingUser.email,
          firstname: existingUser.firstname,
          lastname: existingUser.lastname,
        },
      });
    }
  } catch (error) {
    console.log("Login error", error);
    throw error;
  }
};
