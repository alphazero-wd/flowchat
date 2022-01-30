import { Request } from "express";

export interface MyContext {
  req: Request & { payload?: { userId: string } };
}
