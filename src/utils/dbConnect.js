import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "../.env.local" }); // Ensure environment variables are loaded

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not defined! Check your .env.local file.");
  process.exit(1); // Stop execution
}

const dbConnect = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};

export default dbConnect;
