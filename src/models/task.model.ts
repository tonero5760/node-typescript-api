import mongoose, { Schema } from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "userModel",
    },

    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "categoryModel",
    },

    title: {
      type: String,
      required: true,
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const taskModel = mongoose.model("taskModel", taskSchema);

export default taskModel;
