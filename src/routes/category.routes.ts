import express, { NextFunction, RequestHandler } from "express";
import { authenticationMiddleWare } from "../middleware";
import {
  getAllCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/category.controller";

const categoryRoutes = express.Router();

categoryRoutes.use(authenticationMiddleWare);

categoryRoutes.route("/").get(getAllCategories);
categoryRoutes.route("/create").get(createCategory);
categoryRoutes.route("/delete/:id").delete(deleteCategory);
categoryRoutes.route("/update").get(updateCategory);

export default categoryRoutes;
