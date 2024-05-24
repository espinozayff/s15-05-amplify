import mongoose from "mongoose";
(async () => {
  await mongoose.connect("mongodb://localhost:27017/AmplifyDB");
  console.log('database is connected');
  
})();
