import express from "express";
import { authenticationMiddleWare } from "../middleware/index";
import { getAllTasks, createTask,deleteTask } from "../controllers/task.controller";

const taskRoutes = express.Router();

taskRoutes.use(authenticationMiddleWare);

taskRoutes.route("/").get(getAllTasks);
taskRoutes.route("/create").post(createTask);
taskRoutes.route("/delete").delete(deleteTask);

export default taskRoutes;
