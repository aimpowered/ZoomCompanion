// MongoDB connection
import mongoose from "mongoose";

const url = process.env.DATABASE_URL as string;
let connection: typeof mongoose;

const startDB = async () => {
  if (!connection) connection = await mongoose.connect(url);
  return connection;
};

export default startDB;
