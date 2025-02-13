import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "@/utils/dbConnect";
import Admin from "@/models/Admin";

export async function POST(req: NextRequest) {
  try {
    await dbConnect(); // Ensure DB is connected

    const { username, password } = await req.json();

    // Find the admin user
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return NextResponse.json({ message: "Admin not found" }, { status: 404 });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    return NextResponse.json({ message: "Login successful", token }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}
