import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "../src/models/Admin.js";  // Use relative path
import dbConnect from "../src/utils/dbConnect.js";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

async function createAdmin() {
  await dbConnect(); // Connect to DB

  const username = "raed"; // Change this if needed
  const password = "raed@123"; // Choose a strong password

  // Check if admin already exists
  const existingAdmin = await Admin.findOne({ username });
  if (existingAdmin) {
    console.log("Admin already exists!");
    mongoose.connection.close();
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newAdmin = new Admin({ username, password: hashedPassword });
  await newAdmin.save();

  console.log("Admin created successfully!");
  mongoose.connection.close();
}

createAdmin().catch((err) => {
  console.error("Error creating admin:", err);
  mongoose.connection.close();
});
