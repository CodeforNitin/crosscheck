import jwt from "jsonwebtoken";

export const generateToken = (payload: { email: string; emp_id: number }) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "2d" });
};
