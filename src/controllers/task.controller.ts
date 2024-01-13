import { Request, Response } from "express";
import { AuthRequest } from "../middleware/index";
import taskModel from "../models/task.model";
import categoryModel from "../models/category.model";
import ITask from "../interface/task.interface";

export const getAllTasks = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    const tasks = await taskModel.find({
      user: user,
    });

    if (tasks.length < 1) {
      res.status(400).send({ message: "No task" });
    } else {
      res.send(tasks);
      console.log(tasks);
    }
  } catch (error) {
    res.status(400).send({ message: "Error getting tasks" });
    console.log("Get task error",error);
  }
};

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    const { title, date, categoryId } = req.body;

    //check if d category id belongs to d current user
    const categorys = await categoryModel.find({ user: user });

    categorys.map(async (cate) => {
      const { _id } = cate;
      if (_id == categoryId) {
        const task = await taskModel.create({
          title,
          date,
          categoryId,
          user,
        });
        res.status(201).send(task);
      } else {
        console.log("unknown category");
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error in create task");
  }
};


export const deleteTask = async(req: AuthRequest, res: Response)=>{

}