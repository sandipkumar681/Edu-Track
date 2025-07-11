import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectToMongo = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.mongoURI}/${DB_NAME}`
      // `${process.env.mongoURI}`
    );

    // console.log(connectionInstance.connection.host);
  } catch (error) {
    console.error("MONGODB CONNECTION ERROR: ", error);
    process.exit(1);
  }
};

export default connectToMongo;
