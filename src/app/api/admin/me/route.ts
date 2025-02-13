import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Admin from "@/models/Admin";
import dbConnect from "@/utils/dbConnect";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // Get token from headers
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    if (!decoded) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    // Find admin in DB
    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) {
      return NextResponse.json({ message: "Admin not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Authenticated", admin }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Auth check failed", error: error.message }, { status: 500 });
  }
}
