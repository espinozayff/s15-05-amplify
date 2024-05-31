import mongoose from "mongoose";

(async () => {
  await mongoose.connect("mongodb+srv://agustinbarrera99:hola1234@agustincluster.iqkd12i.mongodb.net/Amplify");
  console.log('database is connected');
  
})();
