import jwt from "jsonwebtoken";

export function verifyAdmin(req, res, next) {
  const token = req.cookies.adminToken;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") return res.status(403).json({ message: "Forbidden" });

    req.admin = decoded; // Attach admin data to request
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}
