import mongoose from "mongoose";
import { db } from "./utils/constant";

(async () => {
  await mongoose.connect(db);
  console.log('database is connected');
  
})();
