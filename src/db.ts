import mongoose from "mongoose";
import "dotenv/config";

const dbConnect = async () => {
  try {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH, MONGO_DB } = process.env;
    const connection = await mongoose.connect(
      `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.hkgd7sc.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`
    );
    if (connection) {
      console.log("Connection established!!!");
    }
  } catch (error) {
    console.log("Error in database connection", error);
    throw error;
  }
};

export default dbConnect;
