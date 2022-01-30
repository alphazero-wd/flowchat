import { MyContext } from "../types/MyContext";
import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";

export const auth: MiddlewareFn<MyContext> = async (
  { context: { req } },
  next
) => {
  const { authorization } = req.headers;
  if (!authorization?.startsWith("Bearer "))
    return { error: { message: "You are not authorized." } };
  const token = authorization.split(" ")[1];

  const payload = verify(token, process.env.JWT_ACCESS_SECRET!);
  req.payload = payload as any;

  return next();
};
