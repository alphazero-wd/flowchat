import { sign } from "jsonwebtoken";
import { User } from "../entities/User";

export const createAccessToken = (user: User) =>
  sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: "1d",
  });
export const createRefreshToken = (user: User) =>
  sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "15m",
  });
