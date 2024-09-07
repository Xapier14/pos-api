import { Auth } from "services";
import { ILoginErrorResponse, ILoginSuccessResponse } from "types";
import { Router, Request, Response } from "express";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const username: string = req.body.username;
  const password: string = req.body.password;

  // check if there is an account that matches the username
  // and password matches
  const account = await Auth.checkCredentials(username, password);

  // if no account matches username + password:
  if (account !== null) {
    const errorResponse: ILoginErrorResponse = {
      message: "Authentication Fail.",
    };

    // login has failed, send 401 response and error message
    res.status(401).send(errorResponse);
    return;
  }

  // create the session
  const session = await Auth.createSession(username);
  const successResponse: ILoginSuccessResponse = {
    token: session.token,
  };
  // login success, send 200 response and token
  res.status(200).send(successResponse);
});

export { router as PostRouter };
