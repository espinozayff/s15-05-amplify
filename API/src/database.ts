import mongoose from "mongoose";
import { db } from "./utils/constant";

(async () => {
  try {
    await mongoose.connect(db);
    console.log('database is connected');
  } catch (error) {
    console.log(error);
  }
})();
