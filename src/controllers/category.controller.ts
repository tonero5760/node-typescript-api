import { NextFunction, Request, Response } from "express";
import ICategory from "../interface/category.interface";
import categoryModel from "../models/category.model";
import taskModel from "../models/task.model";
import { AuthRequest } from "../middleware";
import { Types } from "mongoose";

export const getAllCategories = async (req: AuthRequest, res: Response) => {
  try {
    const { user } = req;
    const categories = await categoryModel.find({ user: user });
    return res.send(categories);
  } catch (error) {
    res.send({ error: "Something went wrong" });
    console.log("Error in getAllCategories", error);
    throw error;
  }
};

export const createCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { user } = req;
    const { name, isEditable, color, icon }: ICategory = req.body;

    const category = await categoryModel.create({
      color,
      icon,
      name,
      user,
    });

    console.log(user);

    res.send(category);
  } catch (error) {
    console.log("error in createCategory", error);
    res.send({ error: "Something went wrong" });
    throw error;
  }
};

export const deleteCategory = async (req: AuthRequest, res: Response) => {
  let categoryList;
  try {
    const { user } = req;
    const { id } = req.params;

    //category should only be deleted by the category creator
    // await categoryModel.deleteMany({ id });
    const categoryList = await categoryModel.find({ user: user });

    if (categoryList.length < 1) {
      res.status(400).send({ error: "Empty category" });
      console.log("Categories doesnt belong to user");
    } else {
      //once a category is deleted, clear all the tasks under the category
      const item = await categoryModel.findByIdAndDelete(id, { new: true });
      res.status(200).send(item);
      console.log("Item successfully deleted");
    }
  } catch (error) {
    res.status(400).send({ Error: "Failed to remove item" });
    console.log("Error in category delete", error);
  }
};

export const updateCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { user } = req;
    const { _id, color, icon, isEditable, name }: ICategory = req.body;

    //find all categories by dis creator
    const categoryList = await categoryModel.find({ user: user });

    if (categoryList.length < 1) {
      res.status(400).send({ error: "Empty category" });
      console.log("Categories doesnt belong to user");
    } else {
      await categoryModel.updateOne(
        { _id },
        { $set: { name, color, icon, isEditable } }
      );
      res.send({ message: "Update successful" });
    }
  } catch (error) {
    console.log("Error in updateCategory", error);
    res.send({ error: "Error updating the category" });
    throw error;
  }
};
