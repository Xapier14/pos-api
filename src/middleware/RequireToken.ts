import { Auth } from "services";
import { IErrorResponse } from "types";
import { Request, Response } from "express";

export const RequireToken = async (
  req: Request,
  res: Response,
  next: () => void
) => {
  const token = req.header("x-token") ?? [];
  const validToken = await Auth.verifyToken(token.at(0) ?? "");

  // if token is not valid
  if (!validToken) {
    const errorResponse: IErrorResponse = {
      message: "Not authenticated.",
    };
    res.status(401).send(errorResponse);
    return;
  }

  // token is valid, continue to route
  next();
};
