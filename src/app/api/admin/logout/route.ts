import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const response = NextResponse.json({ message: "Logged out successfully" }, { status: 200 });

    // Clear the token from cookies (if using cookies for auth)
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Logout failed", error: error.message }, { status: 500 });
  }
}
