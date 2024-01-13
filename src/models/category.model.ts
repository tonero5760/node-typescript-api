import mongoose, { Schema } from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  isEditable: {
    type: Boolean,
    required: false,
    default: true,
  },

  color: {
    id: String,
    name: String,
    code: String,
  },

  icon: {
    id: String,
    name: String,
    symbol: String,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "userModel",
    required: true,
  },
});

const categoryModel = mongoose.model("categoryModel", categorySchema);

export default categoryModel;
