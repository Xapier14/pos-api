import { Auth } from "services";
import { ICheckTokenResponse } from "types";
import { Router, Request, Response } from "express";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const token: string = req.body.token;

  const validToken = await Auth.verifyToken(token);

  const response: ICheckTokenResponse = {
    isValid: validToken,
  };

  res.status(validToken ? 200 : 401).send(response);
});

export { router as CheckTokenRouter };
