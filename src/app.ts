import express, { Request, Response } from "express";

import cors from "cors";
import dbConnect from "./db";
import userRoutes from "./routes/user.routes";
import { authenticationMiddleWare } from "./middleware";
import categoryRoutes from "./routes/category.routes";
import taskRoutes from "./routes/task.routes";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3033;

dbConnect();

app.get("/test", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/user", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
