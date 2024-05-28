import mongoose from "mongoose";

(async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/AmplifyDB");
    console.log('database is connected');
  } catch (error) {
    console.error(error);
  }
})();
